import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { User } from '../models/user.model'
import { verifyAuthenticationJWT } from '../services/jwt.service'
import { logger } from '../services/logger.service'


export async function AuthMiddleware (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.http(`Error: Invalid authentication token format`)
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid authentication token format' })
    }

    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      logger.http(`Error: Authentication token is missing`)
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token is missing' })
    }

    // Verifica o token de autenticação
    const userId = verifyAuthenticationJWT(token)

    // Busca o usuário associado ao token
    const user = await User.findById(userId)
    if (!user) {
      logger.http(`Error: Invalid authentication token: ${userId}`)
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid authentication token' })
    }

    // Adiciona o usuário autenticado ao objeto de solicitação para uso posterior
    req.user = user

    logger.http(`Successful authenticated user: ${user}`)

    // Continua com a próxima etapa da solicitação
    next()
  } catch (error) {
    console.error(error)
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid authentication token' })
  }
}

/* TOFIX não foi possível usar global.d.ts para sobreescrever */
declare module 'express-serve-static-core' {
  export interface Request {
    user?: any
  }
}