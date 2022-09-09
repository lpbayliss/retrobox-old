import { FetchDropResponse, ProblemJson } from "@retrobox/types";
import { Request, Response } from "express";

import { fetchDropUseCase } from "../usecases";

const fetchDrop = async (
  req: Request,
  res: Response<FetchDropResponse | ProblemJson>
) => {
  const [err, drop] = await fetchDropUseCase.execute(req.params.id);

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

export default {
  fetchDrop,
};
