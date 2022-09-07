import { Router } from "express";
import { itemController } from "../controllers";
import { isAuthenticatedMiddleware } from "../middleware";

const RouteBase = "/items";
const DeleteItemRoute = RouteBase + "/:id";

export default Router()
  .use(isAuthenticatedMiddleware)
  .delete(DeleteItemRoute, itemController.deleteItem);
