import { ApplicationError } from "../errors";

export type Result<T, E = ApplicationError> = Promise<[E] | [null, T]>;