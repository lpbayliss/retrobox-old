import { Router } from "express";
import { boxController } from "../controllers";

const RouteBase = "/boxes";

const CreateBoxRoute = RouteBase;
const FetchBoxRoute = RouteBase + "/:id";
const AddItemToBoxRoute = RouteBase + "/:id/add-item";
const CreateDropRoute = RouteBase + "/:id/create-drop";

export default Router()
  .post(CreateBoxRoute, boxController.createBox)
  .get(FetchBoxRoute, boxController.fetchBox)
  .post(AddItemToBoxRoute, boxController.addItem)
  .post(CreateDropRoute, boxController.createDrop);
