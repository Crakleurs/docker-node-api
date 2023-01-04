import { NextFunction, Request, Response } from 'express'

export const ExceptionsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  if (res.headersSent) {
    return next(err)
  }

  if (err.status && err.error) {
    return res
      .status(err.status)
      .json({ error: err.error })
  }

  return res
    .status(500)
    .json({ error: 'INTERNAL ERROR' })
}
