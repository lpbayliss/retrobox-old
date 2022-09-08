import { FetchUserResponse, ProblemJson } from "@retrobox/types";
import { Request, Response } from "express";
import { fetchUserByIdUseCase } from "../usecases";

const fetchMe = async (req: Request, res: Response<FetchUserResponse | ProblemJson>) => {
  const [err, user] = await fetchUserByIdUseCase.execute(req.user!.id);

  if (err) {
    if ((err.name === "NotFoundError"))
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

