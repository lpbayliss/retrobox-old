import { fetchUserByIdUseCase } from '../../usecases'
import { createUserController } from './user.controller'

export const userController = createUserController(fetchUserByIdUseCase)