import { Request, Response } from "express";
import * as db from "@retrobox/database";

const health = async (_req: Request, res: Response) => {
  const healthy = await db.checkHealth();
  return res.json({ healthy });
};

const controller = {
  health,
};

export default controller;
