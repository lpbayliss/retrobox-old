import { Request } from "express";
import { boxInteractor } from "../interactors";
import { Response } from "../lib/types";

type CreateBoxResponse = Response<{ id: string }>;
type FetchBoxResponse = Response<{
  id: string;
  itemCount: number;
  latestDrop: { id: string; itemCount: number; createdAt: number };
  allDrops: { id: string; itemCount: number; createdAt: number }[];
}>;
type AddItemToBoxResponse = Response<{ id: string }>;
type CreateDropFromBoxResponse = Response<{ id: string }>;

export const createBoxController = () => {
  const createBox = async (req: Request, res: CreateBoxResponse) => {
    const [err, boxId] = boxInteractor.createNewBox(req.body.name);

    if (err)
      return res.status(400).send({
        title: "https://retrobox.app/probs/couldnt-create-box",
        status: 400,
        detail: "Something went wrong while creating a box",
        instance: req.originalUrl,
      });

    return res.status(201).send({ data: { id: boxId }, meta: null });
  };

  const fetchBox = async (req: Request, res: FetchBoxResponse) => {
    const [err, box] = boxInteractor.fetchBox(req.params.id);

    if (err)
      return res.status(400).send({
        title: "https://retrobox.app/probs/couldnt-fetch-box",
        status: 400,
        detail: "Something went wrong while fetching a box",
        instance: req.originalUrl,
      });

    return res.status(201).send({ data: box, meta: null });
  };

  const addItem = async (req: Request, res: AddItemToBoxResponse) => {
    const [err, itemId] = boxInteractor.addItemToBox(
      req.params.id,
      req.body.message,
      req.body.author
    );

    if (err)
      return res.status(400).send({
        title: "https://retrobox.app/probs/couldnt-add-item",
        status: 400,
        detail: "Something went wrong while adding an item to a box",
        instance: req.originalUrl,
      });

    return res.status(201).send({ data: { id: itemId }, meta: null });
  };

  const createDrop = async (req: Request, res: CreateDropFromBoxResponse) => {
    const [err, dropId] = boxInteractor.createDropFromBox(req.params.id);

    if (err)
      return res.status(400).send({
        title: "https://retrobox.app/probs/couldnt-create-drop",
        status: 400,
        detail: "Something went wrong while creating a drop",
        instance: req.originalUrl,
      });

    return res.status(201).send({ data: { id: dropId }, meta: null });
  };

  return {
    createBox,
    fetchBox,
    addItem,
    createDrop,
  };
};
