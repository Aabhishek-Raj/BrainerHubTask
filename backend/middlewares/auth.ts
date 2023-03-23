import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import {User} from '../models/userModel'
import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../response/errorResponse'

interface DecodedToken {
    id: string
  }

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken

    //   req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new ErrorResponse('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new ErrorResponse('Not authorized, no token')
  }
})

export { protect }