import { Request } from "express";
import { dropInteractor } from "../interactors";
import { Response } from "../lib/types";

type DeleteItemResponse = Response<{
  id: string;
  createdAt: Date;
  items: { message: string, author: string | null }
}>;

export const createDropController = () => {
  const fetchDrop = async (req: Request, res: DeleteItemResponse) => {
    const [err, drop] = dropInteractor.fetchDrop(req.params.id);

    if (err)
      return res.status(400).send({
        title: "https://retrobox.app/probs/couldnt-fetch-drop",
        status: 400,
        detail: "Something went wrong while deleting an item",
        instance: req.originalUrl,
      });

    return res.status(204).send({ data: drop, meta: null });
  };

  return {
    fetchDrop,
  };
};
