import { IUser } from '../models'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema<IUser>({
  national_id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    default: 10
  }
})

export const User = mongoose.model<IUser>('User', UserSchema)
