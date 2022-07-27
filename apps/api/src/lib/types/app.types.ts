import { ApplicationError } from "../errors";

export type Nullable<T> = T | null;
export type Result<T, E = ApplicationError> = Promise<[E] | [null, T]>;
export type InteractorResult<T> = Result<T>;
export type RepositoryResult<T> = Result<T>;
