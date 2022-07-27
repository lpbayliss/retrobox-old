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
import { boxRouter, dropRouter, itemRouter } from "./routes";
import { getIsDatabaseHealthy } from "./data";

const port = parseInt(process.env.PORT!, 10) || 4000;

express()
  // Setup middleware
  .use(compression())
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(helmet({ contentSecurityPolicy: false }))
  .use(cors())
  .use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    return res.status(500).send({
      title: "https://retrobox.app/probs/server-error",
      status: 500,
      detail: err.message,
      instance: req.originalUrl,
    });
  })
  // Set up Rroutes
  .get("/health", async (_req: Request, res: Response) => {
    const isDatabaseHealthy = await getIsDatabaseHealthy();
    res.status(200).send({
      server: true,
      database: isDatabaseHealthy,
    });
  })
  .use(boxRouter)
  .use(itemRouter)
  .use(dropRouter)
  // Start Server
  .listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
