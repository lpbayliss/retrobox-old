import { NextFunction, Request, Response } from "express";
import passport from "passport";
import MagicLoginStrategy from "passport-magic-login";

import {
  fetchOrCreateUserByEmailUseCase,
  fetchUserByIdUseCase,
} from "../usecases";
import configService from "./config.service";
import emailService from "./email.service";

passport.serializeUser<string>((user, done) => {
  done(undefined, (user as any).id);
});

passport.deserializeUser<string>(async (id, done) => {
  const [err, user] = await fetchUserByIdUseCase.execute(id);
  if (err) return done(err);
  done(null, user);
});

export const strategy = new MagicLoginStrategy({
  secret: configService.MAGIC_LINK_SECRET,
  callbackUrl: "/login",
  sendMagicLink: async (destination, href) => {
    emailService.send([destination], {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: configService.APP_URL + href,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Retrobox Magic Link",
      },
    });
  },
  verify: async (token, callback) => {
    if (!token) callback(new Error("Token could not be parsed"));
    const [err, user] = await fetchOrCreateUserByEmailUseCase.execute(
      token.destination
    );
    if (err) return callback(err);
    callback(undefined, user);
  },
});

passport.use(strategy);

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const provider = req.path.split("/").slice(-1)[0];
  if ((req.user as any).nickname === "test") next();
  res.redirect(`/auth/${provider}`);
};
