import { DeleteItemResponse, ProblemJson } from "@retrobox/types";
import { Request, Response } from "express";

import { removeItemUseCase } from "../usecases";

const deleteItem = async (
  req: Request,
  res: Response<DeleteItemResponse | ProblemJson>
) => {
  const [err, item] = await removeItemUseCase.execute(req.params.id);

  if (err) {
    if (err.name === "NotFoundError")
      return res.status(404).send({
        title: "https://retrobox.app/probs/item-not-found",
        status: 404,
        detail: err.message,
        instance: req.originalUrl,
      });
    else
      return res.status(500).send({
        title: "https://retrobox.app/probs/internal-server-error",
        status: 500,
        detail: "Something went wrong while deleting an item",
        instance: req.originalUrl,
      });
  }

  return res.status(204).send({ data: item, meta: null });
};

export default {
  deleteItem,
};
