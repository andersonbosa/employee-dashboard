import cors from 'cors'
import debug from 'debug'
import express from 'express'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'
import morgan from 'morgan'
debug('app')
const app = express()


app.use(helmet())
app.use(cors({ origin: ApiConfig.security.cors }))
app.use(express.json())
