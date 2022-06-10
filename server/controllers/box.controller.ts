import { Request, Response } from "express";

const create = async (_req: Request, res: Response) => {
  return res.json({ hello: "world" });
};

const fetch = async (_req: Request, res: Response) => {
  return res.json({ hello: "world" });
};

const controller = {
  create,
  fetch,
};

export default controller;
