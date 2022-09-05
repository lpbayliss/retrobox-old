import { userRepository } from "../../gateways"
import { createCreateUserUseCase } from "./createUser.usecase"
import { createFetchOrCreateUserByEmailUseCase } from "./fetchOrCreateUserByEmail.usecase"
import { createFetchUserByIdUseCase } from "./fetchUserById.usecase"

export const createUserUseCase = createCreateUserUseCase(userRepository)
export const fetchUserByIdUseCase = createFetchUserByIdUseCase(userRepository)
export const fetchOrCreateUserByEmailUseCase = createFetchOrCreateUserByEmailUseCase(userRepository)

export type { ICreateUserUseCase } from './createUser.usecase'
export type { IFetchUserByIdUseCase } from './fetchUserById.usecase'
export type { IFetchOrCreateUserByEmailUseCase } from './fetchOrCreateUserByEmail.usecase'