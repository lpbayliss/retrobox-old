import { Router } from "express";

import { boxController } from "../controllers";
import { isAuthenticatedMiddleware } from "../middleware";

const RouteBase = "/boxes";

const CreateBoxRoute = RouteBase;
const FetchBoxRoute = RouteBase + "/:id";
const AddItemToBoxRoute = RouteBase + "/:id/add-item";
const CreateDropRoute = RouteBase + "/:id/create-drop";

export default Router()
  .use(isAuthenticatedMiddleware)
  .post(CreateBoxRoute, boxController.createBox)
  .get(FetchBoxRoute, boxController.fetchBox)
  .post(AddItemToBoxRoute, boxController.addItem)
  .post(CreateDropRoute, boxController.createDrop);
