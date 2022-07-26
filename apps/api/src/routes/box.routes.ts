import { Router } from "express";
import { boxController } from "../controllers";

const RouteBase = "/box";
const CreateBoxRoute = RouteBase;

export default Router().post(CreateBoxRoute, boxController.createBox);
