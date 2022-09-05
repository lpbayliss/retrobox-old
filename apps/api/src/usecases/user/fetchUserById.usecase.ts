import { IUser } from "../../entities/user.entity";
import { IUserRepository } from "../../gateways/user/user.interface";
import { IUseCase } from "../usecase.interface";

export interface IFetchUserByIdUseCase extends IUseCase<
  { id: string },
  IUser
> {}

export const createFetchUserByIdUseCase = (
  userRepository: IUserRepository
): IFetchUserByIdUseCase => ({
  execute: async ({ id }) => {
    const [err, user] = await userRepository.fetchById(id);
    if (err) return [err];
    return [null, user];
  },
});
