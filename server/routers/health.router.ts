import { Router } from "express";
import { HealthController } from "../controllers";

const router = Router();

router.get("/api/health", HealthController.health);

export default router;