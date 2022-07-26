import { Router } from "express";
import { dropController } from "../controllers";

const routeBase = "/drops";
const fetchDropRoute = routeBase + '/:id';

export default Router().get(fetchDropRoute, dropController.fetchDrop);
