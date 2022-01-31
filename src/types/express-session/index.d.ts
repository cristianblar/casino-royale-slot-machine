/* eslint-disable no-unused-vars */
import 'express-session'

declare module 'express-session' {
  interface Session {
    session_credits: number
  }
}
