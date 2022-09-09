import { NextFunction, Request, Response } from "express";
import { default as parentLogger } from "../services/logger";

const logger = parentLogger.child({ service: "auth-middleware" });

const isAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.debug("Validating authentication");
  logger.debug(req.isAuthenticated());
  if (req.isAuthenticated()) return next();
  logger.info("Unauthorized access attempted", req);
  return res.status(401).send({
    title: "https://retrobox.app/probs/unauthorized",
    status: 401,
    detail: "You are not authorized",
    instance: req.originalUrl,
  });
};

export default isAuthenticatedMiddleware;
