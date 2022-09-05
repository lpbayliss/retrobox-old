import { Request } from "express";
import { IUser } from "../../entities/user.entity";
import { Response } from "../../lib/types";
import { IFetchUserByIdUseCase } from "../../usecases/user";

type FetchMeResponse = Response<IUser>;

export const createUserController = (
  fetchUserByIdUseCase: IFetchUserByIdUseCase
) => {
  const fetchMe = async (req: Request, res: FetchMeResponse) => {
    if (req.isUnauthenticated())
      return res.status(401).send({
        title: "https://retrobox.app/probs/not-authenticated",
        status: 401,
        detail: "Could not authenticate this request",
        instance: req.originalUrl,
      });

    const [err, user] = await fetchUserByIdUseCase.execute({
      id: req.user!.id,
    });

    if (err) {
      return res.status(400).send({
        title: "https://retrobox.app/probs/couldnt-fetch-user",
        status: 400,
        detail: err.message,
        instance: req.originalUrl,
      });
    }

    return res.status(200).send({ data: user, meta: null });
  };

  return {
    fetchMe,
  };
};
