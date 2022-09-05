import { IUser } from "../../entities/user.entity";
import { IUserRepository } from "../../gateways/user/user.interface";
import { IUseCase } from "../usecase.interface";

export interface IFetchOrCreateUserByEmailUseCase extends IUseCase<
  { email: string },
  IUser
> {}

export const createFetchOrCreateUserByEmailUseCase = (
  userRepository: IUserRepository
): IFetchOrCreateUserByEmailUseCase => ({
  execute: async ({ email }) => {
    const [err, user] = await userRepository.fetchOrCreateByEmail(email);
    if (err) return [err];
    return [null, user];
  },
});
