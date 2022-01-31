import { GameService } from './GameService'
import { symbols, thresholds } from '../constants'
import { userDb } from '../db'
import { UserService } from './UserService'

export const userService = new UserService(userDb)
export const gameService = new GameService(
  symbols,
  thresholds,
  (process.env.SLOTS_AMOUNT && +process.env.SLOTS_AMOUNT) || 3
)
