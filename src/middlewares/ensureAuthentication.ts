import { Handler } from 'express'

export const ensureAuthentication: Handler = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  return res.sendStatus(401)
}
