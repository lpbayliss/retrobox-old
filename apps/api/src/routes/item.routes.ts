import { Router } from "express";
import { itemController } from "../controllers";

const RouteBase = "/items";
const DeleteItemRoute = RouteBase + "/:id";

export default Router().delete(DeleteItemRoute, itemController.deleteItem);
