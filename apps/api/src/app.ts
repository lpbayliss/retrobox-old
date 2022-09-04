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
import { getIsDatabaseHealthy } from "./data";
import MagicLoginStrategy from "passport-magic-login";
import passport from "passport";
import expressSession from "express-session";
import { config } from "dotenv";
import AWS from "aws-sdk";
import routesLoader from "./loaders/routes.loader";

config({ path: ".env.local" });
config({ path: `.env.${process.env.APP_ENV}` });
if (!process.env.SESSION_SECRET) throw new Error("Session secret required");
if (!process.env.MAGIC_LINK_SECRET)
  throw new Error("magic link secret required");
if (!process.env.APP_URL) throw new Error("app url required");

AWS.config.update({ region: "ap-southeast-2" });
AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
});

declare module "express-session" {
  interface Session {}
}

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string | null;
    }
  }
}

let currentId = 0;
const users: Record<string, Express.User> = {};

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

const magicLogin = new MagicLoginStrategy({
  secret: process.env.MAGIC_LINK_SECRET!,
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
            Data: process.env.APP_URL + href,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Retrobox Magic Link",
        },
      },
      Source: "noreply@retrobox.app",
    };
    await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();
  },
  verify: ({ destination: email }, callback) => {
    const user: Express.User = { id: String(currentId), name: "Test", email };

    users[user.id] = user;
    currentId++;

    callback(undefined, user);
  },
});

passport.use(magicLogin);

passport.serializeUser<string>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser<string>((id, done) => {
  const user = users[id];
  done(null, user);
});

const port = parseInt(process.env.PORT!, 10) || 4000;

console.log(process.env.ALLOWED_ORIGINS?.split(","));
const app = express();
// Setup middleware
app
  .set("trust proxy", 1)
  .set('port', port)
  .use(compression())
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(helmet({ contentSecurityPolicy: false }))
  .use(
    cors({ origin: process.env.ALLOWED_ORIGINS?.split(","), credentials: true })
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

  routesLoader.load(app)


export default app;
