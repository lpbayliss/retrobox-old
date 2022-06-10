import { Request, Response } from "express";

const create = async (_req: Request, res: Response) => {
  return res.json({ hello: "world" });
};

const controller = {
  create,
};

export default controller;
