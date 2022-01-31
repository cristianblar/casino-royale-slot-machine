import { User } from '../models'
import { UserDb } from './UserDb'

export const userDb = new UserDb(User)
