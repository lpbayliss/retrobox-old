import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { boxRouter, dropRouter, itemRouter, userRouter } from "./routes";
import { getIsDatabaseHealthy } from "./gateways";
import MagicLoginStrategy from "passport-magic-login";
import passport from "passport";
import expressSession from "express-session";
import AWS from "aws-sdk";
import { IConfigService } from "./services/config/config.interface";
import { IFetchOrCreateUserByEmailUseCase, IFetchUserByIdUseCase } from "./usecases/user";

declare module "express-session" {
  interface Session {}
}

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      nickname: string | null;
    }
  }
}

const defaultSessionConfig = {
  secret: "secret",
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

const createApp = (
  configService: IConfigService,
  fetchOrCreateUserByEmailUseCase: IFetchOrCreateUserByEmailUseCase,
  fetchUserByIdUseCase: IFetchUserByIdUseCase
) => {
  const magicLogin = new MagicLoginStrategy({
    secret: configService.secrets.magicLinkSecret,
    callbackUrl: "/login",
    sendMagicLink: async (destination, href) => {
      var params = {
        Destination: {
          ToAddresses: [destination],
        },
        Message: {
          Body: {
            Text: {
              Charset: "UTF-8",
              Data: configService.env.appUrl + href,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Retrobox Magic Link",
          },
        },
        Source: "noreply@retrobox.app",
      };
      await new AWS.SES({ apiVersion: "2010-12-01" })
        .sendEmail(params)
        .promise();
    },
    verify: async ({ destination: email }, callback) => {
      const [err, user] = await fetchOrCreateUserByEmailUseCase.execute({ email })
      if (err) return callback(err)
      callback(undefined, user)
    },
  });

  passport.use(magicLogin);

  passport.serializeUser<string>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<string>(async (id, done) => {
    const [err, user] = await fetchUserByIdUseCase.execute({ id });
    if (err) return done(err)
    done(null, user);
  });

  const app = express()
    // Setup middleware
    .set("trust proxy", 1)
    .set("port", configService.env.port)
    .use(compression())
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(helmet({ contentSecurityPolicy: false }))
    .use(
      cors({
        origin: configService.env.allowedOrigins,
        credentials: true,
      })
    )
    .use(cookieParser())
    .use(expressSession(defaultSessionConfig))
    .use(passport.initialize())
    .use(passport.session())
    .use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) return next(err);
      return res.status(500).send({
        title: "https://retrobox.app/probs/server-error",
        status: 500,
        detail: err.message,
        instance: req.originalUrl,
      });
    })
    // Set up Routes
    .get("/health", async (_req: Request, res: Response) => {
      const isDatabaseHealthy = await getIsDatabaseHealthy();
      res.status(200).send({
        server: true,
        database: isDatabaseHealthy,
      });
    })
    .post("/auth/login", magicLogin.send)
    .get(
      "/auth/login/callback",
      passport.authenticate("magiclogin"),
      (_req, res) => {
        res.sendStatus(200);
      }
    )
    .get(
      "/me",
      (req, res, _next) => {
        if (req.isAuthenticated()) {
          res.json(req.user);
        } else {
          res.sendStatus(401);
        }
      },
      (req: Request, res: Response) => res.json(req.user)
    )
    .use(boxRouter)
    .use(itemRouter)
    .use(dropRouter)
    .use(userRouter);

  return app;
};

export default createApp;