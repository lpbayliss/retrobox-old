import {
  AddItemResponse,
  CreateBoxResponse,
  CreateDropResponse,
  FetchBoxResponse,
  ProblemJson,
} from "@retrobox/types";
import { Request, Response } from "express";
import logger from "../services/logger";

import {
  addItemToBoxUseCase,
  createBoxUseCase,
  createDropFromBoxUseCase,
  fetchBoxUseCase,
} from "../usecases";

const createBox = async (
  req: Request,
  res: Response<CreateBoxResponse | ProblemJson>
) => {
  const [err, box] = await createBoxUseCase.execute(req.body.name);

  if (err) {
    logger.error(err);
    return res.status(400).send({
      title: "https://retrobox.app/probs/couldnt-create-box",
      status: 400,
      detail: "Something went wrong while creating a box",
      instance: req.originalUrl,
    });
  }

  return res.status(201).send({ data: box, meta: null });
};

const fetchBox = async (
  req: Request,
  res: Response<FetchBoxResponse | ProblemJson>
) => {
  const [err, box] = await fetchBoxUseCase.execute(req.params.id);

  if (err) {
    logger.error(err);
    if (err.name === "NotFoundError")
      return res.status(404).send({
        title: "https://retrobox.app/probs/box-not-found",
        status: 404,
        detail: err.message,
        instance: req.originalUrl,
      });
    else
      return res.status(400).send({
        title: "https://retrobox.app/probs/internal-error",
        status: 400,
        detail: err.message,
        instance: req.originalUrl,
      });
  }

  return res.status(200).send({ data: box, meta: null });
};

const addItem = async (
  req: Request,
  res: Response<AddItemResponse | ProblemJson>
) => {
  const [err, item] = await addItemToBoxUseCase.execute(
    req.params.id,
    req.body.message,
    req.body.author
  );

  if (err) {
    logger.error(err);
    return res.status(400).send({
      title: "https://retrobox.app/probs/couldnt-add-item",
      status: 400,
      detail: "Something went wrong while adding an item to a box",
      instance: req.originalUrl,
    });
  }

  return res.status(201).send({ data: item, meta: null });
};

const createDrop = async (
  req: Request,
  res: Response<CreateDropResponse | ProblemJson>
) => {
  const [err, drop] = await createDropFromBoxUseCase.execute(req.params.id);

  if (err) {
    logger.error(err);
    return res.status(400).send({
      title: "https://retrobox.app/probs/couldnt-create-drop",
      status: 400,
      detail: err.message,
      instance: req.originalUrl,
    });
  }

  return res.status(201).send({ data: drop, meta: null });
};

export default {
  createBox,
  fetchBox,
  addItem,
  createDrop,
};
