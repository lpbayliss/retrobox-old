import { Router } from "express";
import { userController } from "../controllers";

const routeBase = "/users";
const fetchMeRoute = routeBase + "/me";

export default Router().get(fetchMeRoute, userController.fetchMe);
