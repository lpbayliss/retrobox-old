import { FetchUserResponse, ProblemJson } from "@retrobox/types";
import { Request, Response } from "express";
import logger from "../services/logger.service";

import { fetchUserByIdUseCase } from "../usecases";

const fetchMe = async (
  req: Request,
  res: Response<FetchUserResponse | ProblemJson>
) => {
  if (!req.user)
    return res.status(401).send({
      title: "https://retrobox.app/probs/not-authenticated",
      status: 401,
      detail: "You are not authenticated",
      instance: req.originalUrl,
    });

  const [err, user] = await fetchUserByIdUseCase.execute(req.user.id);

  if (err) {
    logger.error(err);
    if (err.name === "NotFoundError")
      return res.status(404).send({
        title: "https://retrobox.app/probs/user-not-found",
        status: 404,
        detail: err.message,
        instance: req.originalUrl,
      });
    else
      return res.status(400).send({
        title: "https://retrobox.app/probs/couldnt-fetch-user",
        status: 400,
        detail: err.message,
        instance: req.originalUrl,
      });
  }

  return res.status(200).send({ data: user, meta: null });
};

export default {
  fetchMe,
};
