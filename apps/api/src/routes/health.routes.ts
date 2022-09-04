import { Router } from "express";
import { healthController } from "../controllers";

const routeBase = "/health";
const fetchDropRoute = routeBase;

export default Router().get(fetchDropRoute, healthController.getHealth);
