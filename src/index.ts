import { passport } from './auth'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mainRouter from './routes'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import { errorHandler } from './middlewares'

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))

app.use(errorHandler)

if (process.env.MONGO_URI && process.env.SESSION_SECRET) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(m => m.connection.getClient())
    .then(mClient => {
      console.log('MongoDB connection established successfully')
      app.use(
        session({
          secret: process.env.SESSION_SECRET!,
          resave: false,
          saveUninitialized: true,
          store: MongoStore.create({
            client: mClient,
            autoRemove: 'native'
          }),
          cookie: {
            secure: process.env.NODE_ENV !== 'development',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 14
          }
        })
      )
      app.use(passport.initialize())
      app.use(passport.session())
      app.use('/', mainRouter)
      app.listen((process.env.PORT && +process.env.PORT) || 4000, () =>
        console.log(`App listening on port ${process.env.PORT}!`)
      )
    })
    .catch(console.error)
} else {
  process.exit(1)
}
