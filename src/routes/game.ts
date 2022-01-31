import { ensureAuthentication } from '../middlewares'
import { Router } from 'express'

const gameRouter = Router()

gameRouter.get('/play', ensureAuthentication, (req, res) => {
  res.sendStatus(200)
})

export default gameRouter
