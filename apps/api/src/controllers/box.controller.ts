import { Request } from "express";
import { boxInteractor } from "../interactors";
import {
  AddItemToBoxResponse,
  CreateBoxResponse,
  CreateDropFromBoxResponse,
  FetchBoxResponse,
} from "../lib/types";

export const createBoxController = () => ({
  createBox: async (req: Request, res: CreateBoxResponse) => {
    const [err, boxId] = await boxInteractor.createNewBox(req.body.name);

    if (err)
      return res.status(400).send({
        title: "https://retrobox.app/probs/couldnt-create-box",
        status: 400,
        detail: "Something went wrong while creating a box",
        instance: req.originalUrl,
      });

    return res.status(201).send({ data: { id: boxId }, meta: null });
  },
  fetchBox: async (req: Request, res: FetchBoxResponse) => {
    const [err, box] = await boxInteractor.fetchBox(req.params.id);

    if (err) {
      if ((err.name = "NotFoundError"))
        return res.status(404).send({
          title: "https://retrobox.app/probs/couldnt-fetch-box",
          status: 404,
          detail: err.message,
          instance: req.originalUrl,
        });
      else
        return res.status(400).send({
          title: "https://retrobox.app/probs/couldnt-fetch-box",
          status: 400,
          detail: err.message,
          instance: req.originalUrl,
        });
    }

    return res.status(200).send({ data: box, meta: null });
  },
  addItem: async (req: Request, res: AddItemToBoxResponse) => {
    const [err, itemId] = await boxInteractor.addItemToBox(
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
  },
  createDrop: async (req: Request, res: CreateDropFromBoxResponse) => {
    const [err, dropId] = await boxInteractor.createDropFromBox(req.params.id);

    if (err)
      return res.status(400).send({
        title: "https://retrobox.app/probs/couldnt-create-drop",
        status: 400,
        detail: "Something went wrong while creating a drop",
        instance: req.originalUrl,
      });

    return res.status(201).send({ data: { id: dropId }, meta: null });
  },
});
