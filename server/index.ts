import next from "next";
import express, { json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { BoxRouter, DumpRouter, HealthRouter, ItemRouter } from "./routers";

const port = parseInt(process.env.PORT!, 10) || 3000;
const isProd = process.env.NODE_ENV === "production";

const nextApp = next({ dev: !isProd });
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();
  const app = express();

  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());

  app.use(HealthRouter);
  app.use(BoxRouter);
  app.use(ItemRouter);
  app.use(DumpRouter);

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port}`);
    console.log("🛑 Press CTRL-C to stop");
  });
})();
