import express from 'express'
import { AuthController } from '../controllers/auth.controller'


const AuthRouter = express.Router()

AuthRouter.post('/auth/register', AuthController.register)
AuthRouter.post('/auth/login', AuthController.login)

export { AuthRouter }
