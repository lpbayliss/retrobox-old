import { Request } from "express";
import { itemInteractor } from "../interactors";
import { Response } from "../lib/types";

type DeleteItemResponse = Response<null>;

export const createItemController = () => {
  const deleteItem = async (req: Request, res: DeleteItemResponse) => {
    const [err] = itemInteractor.removeItem(req.params.id);

    if (err)
      return res.status(400).send({
        title: "https://retrobox.app/probs/couldnt-delete-item",
        status: 400,
        detail: "Something went wrong while deleting an item",
        instance: req.originalUrl,
      });

    return res.status(204).send({ data: null, meta: null });
  };

  return {
    deleteItem,
  };
};
