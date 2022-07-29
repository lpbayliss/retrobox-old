import { Request } from "express";
import { dropInteractor } from "../interactors";
import { NotFoundError } from "../lib/errors";
import { Response } from "../lib/types";

type FetchDropResponse = Response<{
  id: string;
  createdAt: Date;
  items: { message: string; author: string | null }[];
}>;

export const createDropController = () => {
  const fetchDrop = async (req: Request, res: FetchDropResponse) => {
    const [err, drop] = await dropInteractor.fetchDrop(req.params.id);

    if (err) {
      if (err.name === "NotFoundError")
        return res.status(404).send({
          title: "https://retrobox.app/probs/drop-not-found",
          status: 404,
          detail: err.message,
          instance: req.originalUrl,
        });
      else
        return res.status(400).send({
          title: "https://retrobox.app/probs/couldnt-fetch-drop",
          status: 400,
          detail: err.message,
          instance: req.originalUrl,
        });
    }

    return res.status(200).send({ data: drop, meta: null });
  };

  return {
    fetchDrop,
  };
};
