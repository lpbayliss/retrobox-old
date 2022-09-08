import { Router } from "express";
import { dropController } from "../controllers";
import { isAuthenticatedMiddleware } from "../middleware";

const routeBase = "/drops";
const fetchDropRoute = routeBase + "/:id";

export default Router()
  .use(isAuthenticatedMiddleware)
  .get(fetchDropRoute, dropController.fetchDrop);
