import { Request } from "express";
import { IUser } from "../../entities/user.entity";
import { Response } from "../../lib/types";
import { IFetchUserByIdUseCase } from "../../usecases/user";

type FetchMeResponse = Response<IUser>;

export const createUserController = (
  fetchUserByIdUseCase: IFetchUserByIdUseCase
) => {
  const fetchMe = async (req: Request, res: FetchMeResponse) => {
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
