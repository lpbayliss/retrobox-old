import { Router } from "express";
import { BoxController } from "../controllers";

const router = Router();

router.post("/api/box", BoxController.create);
router.get("/api/box/:id", BoxController.fetch);

export default router;