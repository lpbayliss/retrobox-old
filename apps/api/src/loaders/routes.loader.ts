import type { Express } from "express";
import { IAppLoader } from "../lib/types";
import { boxRouter, dropRouter, itemRouter, healthRouter } from "../routes";

const routesLoader: IAppLoader = {
  load: (app: Express) => {
    app.use(boxRouter);
    console.log("[Route Loader]: Loaded Box Routes");
    app.use(itemRouter);
    console.log("[Route Loader]: Loaded Item Routes");
    app.use(dropRouter);
    console.log("[Route Loader]: Loaded Drop Routes");
    app.use(healthRouter);
    console.log("[Route Loader]: Loaded Health Routes");
  },
};

export default routesLoader;
