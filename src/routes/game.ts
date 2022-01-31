import { ensureAuthentication } from '../middlewares'
import { gameService, userService } from '../services'
import { Router } from 'express'

const gameRouter = Router()

gameRouter.get('/play', ensureAuthentication, (req, res) => {
  if (req.session.session_credits === 0) return res.sendStatus(402)

  req.session.session_credits -= 1
  const { isWinner, result } = gameService.play(req.session.session_credits)

  if (!isWinner) {
    if (req.session.session_credits === 0)
      userService.cashOutCredits(req.user!.id, 0)
    return res
      .status(200)
      .json({ credits: req.session.session_credits, result })
  }

  req.session.session_credits += result[0].score
  return res.status(200).json({ credits: req.session.session_credits, result })
})

export default gameRouter
