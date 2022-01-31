/* eslint-disable no-unused-vars */
import { IUser } from '../models'

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
