import { Router } from "express";
import { ItemController } from "../controllers";

const router = Router();

router.post("/api/item", ItemController.create);

export default router;