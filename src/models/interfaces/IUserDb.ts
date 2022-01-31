import { Document, Types } from 'mongoose'
import { IUser } from '..'

export interface IUserDb {
  findById(id: string): Promise<
    | (Document<unknown, any, IUser> &
        IUser & {
          _id: Types.ObjectId
        })
    | null
  >
  findByNationalId(national_id: string): Promise<
    | (Document<unknown, any, IUser> &
        IUser & {
          _id: Types.ObjectId
        })
    | null
  >
  create(
    national_id: string,
    password: string
  ): Promise<
    Document<unknown, any, IUser> &
      IUser & {
        _id: Types.ObjectId
      }
  >
  updateCredits(id: string, newCredits: number): Promise<unknown>
}
