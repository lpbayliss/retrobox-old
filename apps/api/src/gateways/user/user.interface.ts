import { IUser } from "../../entities/user.entity";
import { Nullable, RepositoryResult } from "../../lib/types";

export type FetchUserRepositoryResult = RepositoryResult<IUser>;
export type CreateUserRepositoryResult = RepositoryResult<IUser>;

export interface IUserRepository {
  create: (email: string, nickname?: string) => CreateUserRepositoryResult;
  fetchById: (id: string) => FetchUserRepositoryResult;
  fetchByEmail: (email: string) => FetchUserRepositoryResult;
  fetchOrCreateByEmail: (email: string) => FetchUserRepositoryResult;
}
