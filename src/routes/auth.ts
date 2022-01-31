import { ensureAuthentication } from '../middlewares'
import { passport } from '../auth'
import { Router } from 'express'
import { symbols } from '../constants'
import { userService } from '../services'

const authRouter = Router()

authRouter.post('/signup-signin', (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error || !user) return res.status(400).json({ error })

    req.login(user, error => {
      if (error) return res.status(400).json({ error })
      req.session.session_credits = req.user!.credits
      return res
        .status(200)
        .json({ credits: req.session.session_credits, symbols })
    })
  })(req, res, next)
})

authRouter.post('/logout', ensureAuthentication, async (req, res) => {
  try {
    if (req.user!.credits !== req.session.session_credits)
      await userService.cashOutCredits(
        req.user!.id,
        req.session.session_credits
      )
    req.logout()
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Something went wrong, please try again')
  }
})

export default authRouter
