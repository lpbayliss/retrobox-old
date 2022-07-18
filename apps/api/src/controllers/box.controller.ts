import to from "await-to-js";
import { Request, Response } from "express";
import * as db from "@retrobox/database";

const createBox = async (req: Request, res: Response) => {
  const [err, data] = await to(db.createBox(req.body.name));
  if (err) return res.status(500).send(err.message);
  return res.status(201).json(data);
};

const fetchBox = async (req: Request, res: Response) => {
  const [err, data] = await to(db.fetchBox(req.params.id));
  if (err) return res.status(500).send(err.message);
  return res.status(200).json(data);
};

const createDump = async (req: Request, res: Response) => {
  const [err, data] = await to(db.createDump(req.params.id));
  if (err) return res.status(500).send(err.message);
  return res.status(201).json(data);
};

const fetchDump = async (req: Request, res: Response) => {
  const [err, data] = await to(db.fetchDump(req.params.id));
  if (err) return res.status(500).send(err.message);
  return res.status(200).json(data);
};

const createItem = async (req: Request, res: Response) => {
  const [err, data] = await to(
    db.createItem(req.params.id, req.body.body, req.body.submitter)
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
