import to from "await-to-js";
import { Request, Response } from "express";
import { PrismaGateway } from "../gateways";

const createBox = async (req: Request, res: Response) => {
  const [err, data] = await to(PrismaGateway.createBox(req.body.name));
  if (err) return res.status(500).send(err.message);
  return res.status(201).json(data);
};

const fetchBox = async (req: Request, res: Response) => {
  const [err, data] = await to(PrismaGateway.fetchBox(req.params.id));
  if (err) return res.status(500).send(err.message);
  return res.status(200).json(data);
};

const createDump = async (req: Request, res: Response) => {
  const [err, data] = await to(PrismaGateway.createDump(req.params.id));
  if (err) return res.status(500).send(err.message);
  return res.status(201).json(data);
};

const fetchDump = async (req: Request, res: Response) => {
  const [err, data] = await to(PrismaGateway.fetchDump(req.params.id));
  if (err) return res.status(500).send(err.message);
  return res.status(200).json(data);
};

const createItem = async (req: Request, res: Response) => {
  const [err, data] = await to(
    PrismaGateway.createItem(req.params.id, req.body.body, req.body.submitter)
  );
  if (err) return res.status(500).send(err.message);
  return res.status(201).json(data);
};

const controller = {
  createBox,
  fetchBox,
  createDump,
  fetchDump,
  createItem,
};

export default controller;
