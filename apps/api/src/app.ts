import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, Request, Response, urlencoded } from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";

import { getIsDatabaseHealthy } from "./gateways";
import { boxRouter, dropRouter, itemRouter, userRouter } from "./routes";
import { configService, defaultLogger } from "./services";
import { strategy } from "./services/auth.service";

const app = express();

app.set("trust proxy", 1);
app.set("port", configService.PORT);
app.set("env", configService.NODE_ENV);

app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: configService.ALLOWED_ORIGINS,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: configService.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: configService.NODE_ENV !== "development",
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  defaultLogger.info("Inbound Request", {
    cookie: req.headers.cookie,
    "set-cookie": req.headers["set-cookie"],
  });
  next();
});

// Set up Routes
app.get("/health", async (_req: Request, res: Response) => {
  const isDatabaseHealthy = await getIsDatabaseHealthy();
  res.status(200).send({
    server: true,
    database: isDatabaseHealthy,
  });
});
app.post("/auth/login", strategy.send);
app.get(
  "/auth/login/callback",
  passport.authenticate("magiclogin"),
  (_req, res) => {
    res.sendStatus(200);
  }
);
app.use(boxRouter);
app.use(itemRouter);
app.use(dropRouter);
app.use(userRouter);

export default app;
