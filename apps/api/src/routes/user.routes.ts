import { Router } from "express";

import { userController } from "../controllers";
import { isAuthenticatedMiddleware } from "../middleware";

const routeBase = "/users";
const fetchMeRoute = routeBase + "/me";

export default Router()
  .use(isAuthenticatedMiddleware)
  .get(fetchMeRoute, userController.fetchMe);
