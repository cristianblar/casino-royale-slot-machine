import { IUser, IUserDb } from '../models'
import { Model } from 'mongoose'

export class UserDb implements IUserDb {
  constructor(private UserModel: Model<IUser>) {}

  findById(id: string) {
    return this.UserModel.findById(id).exec()
  }

  findByNationalId(national_id: string) {
    return this.UserModel.findOne({ national_id }).exec()
  }

  create(national_id: string, password: string) {
    return this.UserModel.create({
      national_id,
      password
    })
  }

  updateCredits(id: string, newCredits: number) {
    return this.UserModel.updateOne({ id }, { credits: newCredits }).exec()
  }
}
