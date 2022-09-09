import { NextFunction, Request, Response } from "express";

const isAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).send({
    title: "https://retrobox.app/probs/unauthorized",
    status: 401,
    detail: "You are not authorized",
    instance: req.originalUrl,
  });
};

export default isAuthenticatedMiddleware;
