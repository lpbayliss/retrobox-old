import { InternalError } from "../errors";

export type InteractorResult<T> = [InternalError | null, T | null]