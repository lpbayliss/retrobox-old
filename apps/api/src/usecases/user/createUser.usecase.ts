import { IUser } from "../../entities/user.entity";
import { IUserRepository } from "../../gateways/user/user.interface";
import { IUseCase } from "../usecase.interface";

export interface ICreateUserUseCase extends IUseCase<
  { email: string; nickname?: string },
  IUser
> {}

export const createCreateUserUseCase = (
  userRepository: IUserRepository
): ICreateUserUseCase => ({
  execute: async ({ email, nickname }) => {
    const [err, user] = await userRepository.create(email, nickname);
    if (err) return [err];
    return [null, user];
  },
});
