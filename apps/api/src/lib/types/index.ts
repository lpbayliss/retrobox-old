import type { Express } from "express";

export * from "./box.types";
export * from "./item.types";
export * from "./drop.types";
export * from "./web.types";
export * from "./app.types";

export interface IAppLoader<TOptions = {}> {
  load: (app: Express, options?: TOptions) => void
}