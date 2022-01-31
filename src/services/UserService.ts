import { IUserDb } from '../models'

export class UserService {
  constructor(private userDb: IUserDb) {}

  getById(id: string) {
    return this.userDb.findById(id)
  }

  getByNationalId(national_id: string) {
    return this.userDb.findByNationalId(national_id)
  }

  create(national_id: string, password: string) {
    return this.userDb.create(national_id, password)
  }

  cashOutCredits(id: string, newCredits: number) {
    return this.userDb.updateCredits(id, newCredits)
  }
}
