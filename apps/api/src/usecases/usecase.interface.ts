import { Result } from "../lib/types"

export interface IUseCase<Input, Output> {
  execute: (input: Input) => Result<Output>
}