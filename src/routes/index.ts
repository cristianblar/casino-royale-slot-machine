import { Router } from 'express'
import authRouter from './auth'
import gameRouter from './game'

const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/game', gameRouter)

export default mainRouter
