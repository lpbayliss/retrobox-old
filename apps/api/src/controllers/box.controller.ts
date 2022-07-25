import { Request, Response } from "express";
import { boxInteractor } from "../interactors";

export const createBoxController = () => {
  const createBox = (req: Request, res: Response) => {
    boxInteractor
      .createNewBox(req.body.name)
      .then((id) => res.status(201).send({ data: { id } }))
      .catch(_error => res.status(400).send({
        title: 'https://example.com/probs/server-error',
        status: 400,
        detail: "Something went wrong creating a box",
        instance: '/box/create'
      }));
  };

  return {
    createBox
  }
}