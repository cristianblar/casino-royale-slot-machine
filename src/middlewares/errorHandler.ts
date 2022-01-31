import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = function (
  err,
  req,
  res,
  next
) {
  console.error(err.stack)
  res.status(500).send('Something went wrong, please try again')
}
