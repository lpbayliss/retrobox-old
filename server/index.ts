import next from "next";
import express, { json, Request, Response, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { PrismaClient } from "@prisma/client";

const port = parseInt(process.env.PORT!, 10) || 3000;
const isProd = process.env.NODE_ENV === "production";

const nextApp = next({ dev: !isProd });
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();
  const app = express();

  // if (isProd) app.set('trustproxy', true);
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());

  app.get("/api/health", async (_req: Request, res: Response) => {
    const prisma = new PrismaClient();
    try {
      await prisma.$queryRaw`SELECT 1`;
      return res.json({ healthy: true });
    } catch (e) {
      console.error("DB Not Healthy: ", e.message);
    }
    return res.json({ healthy: false });
  });

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port}`);
    console.log("🛑 Press CTRL-C to stop");
  });
})();
