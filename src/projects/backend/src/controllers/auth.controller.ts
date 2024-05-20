import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { User } from '../models/user.model'
import { createAuthenticationJWT } from '../services/jwt.service'


export class AuthController {
  static async register (req: Request, res: Response) {
    const { name, email, password } = req.body
    try {
      if (!name || !email || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) })
      }

      if (await User.findOne({ email })) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Email already in use' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({ name, email, password: hashedPassword })
      await newUser.save()
      const token = createAuthenticationJWT(newUser.id)

      return res
        .status(StatusCodes.CREATED)
        .json({
          message: 'User registered successfully',
          data: { user: newUser, token },
        })
    } catch (error) {
      console.error(error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' })
    }
  }

  static async login (req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email }).select('+password')
      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: 'Invalid credentials' })
      }

      const isPasswordValid = password && await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: 'Invalid credentials' })
      }

      const token = createAuthenticationJWT(user.id)

      return res
        .status(StatusCodes.OK)
        .json({ data: { token } })
    } catch (error) {
      console.error(error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' })
    }
  }
}

