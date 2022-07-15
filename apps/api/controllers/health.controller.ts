import { Request, Response } from "express";
import { PrismaGateway } from "../gateways";

const health = async (_req: Request, res: Response) => {
  const healthy = await PrismaGateway.checkHealth();
  return res.json({ healthy });
};

const controller = {
  health,
};

export default controller;
