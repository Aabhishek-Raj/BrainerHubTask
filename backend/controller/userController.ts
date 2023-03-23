import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../models/userModel'
import asyncHandler from 'express-async-handler'
import { ErrorResponse } from "../response/errorResponse"

export const signupUser = asyncHandler( async (req: Request, res: Response) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(400)
      throw new ErrorResponse('Please add all fields')
    }
  
    // Check if user exists
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new ErrorResponse('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
  
    if (user) {
      const response = {
        status: 1,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
        message: 'User created successfully',
      }

      res.status(201).json(response)

    } else {
      res.status(400)
      throw new ErrorResponse('Invalid user data')
    }
})

export const signinUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  })

// Generate JWT
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    })
  }
  
