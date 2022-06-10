import { Router } from "express";
import { DumpController } from "../controllers";

const router = Router();

router.post("/api/dump", DumpController.create);
router.post("/api/dump/:id", DumpController.fetch);

export default router;