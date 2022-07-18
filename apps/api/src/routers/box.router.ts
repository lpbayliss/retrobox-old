import { Router } from "express";
import { BoxController } from "../controllers";

const router = Router();

router.post("/api/box", BoxController.createBox);
router.get("/api/box/:id", BoxController.fetchBox);
router.post("/api/box/:id/dump", BoxController.createDump);
router.get("/api/dump/:id", BoxController.fetchDump);
router.post("/api/box/:id/item", BoxController.createItem);

export default router;
