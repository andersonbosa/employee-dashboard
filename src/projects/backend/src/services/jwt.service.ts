import jwt from 'jsonwebtoken'

import { ApiConfig } from '../configs/api.config'


export function createAuthenticationJWT (id: string) {
  return jwt.sign({ userId: id }, ApiConfig.security.jwt.secret, { ...ApiConfig.security.jwt.options })
}

export function verifyAuthenticationJWT (token: string): string {
  try {
    const decoded = jwt.verify(token, ApiConfig.security.jwt.secret) as { userId: string }
    return decoded.userId
  } catch (error) {
    throw new Error('Invalid authentication token')
  }
}
