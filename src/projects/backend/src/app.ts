import cors from 'cors'
import debug from 'debug'
import express from 'express'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'
import morgan from 'morgan'

import { ApiConfig } from './configs/api.config'
import { EnvConfig } from './configs/env.config'
import { v1 } from './routers/v1.router'
import { logger } from './services/logger.service'
import { databaseSetup } from './utils/database-setup'
debug('app')


const app = express()


app.use(helmet())
app.use(cors({ origin: ApiConfig.security.cors }))
app.use(express.json())
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}))

app.use('/api', v1)

app.use((_req: express.Request, res: express.Response, _next: express.NextFunction) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ error: 'Not Found' })
})

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err.stack)
  if (err instanceof SyntaxError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: 'Some problem in the syntax of your request.'
      })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      error: 'Internal Server Error'
    })
})

app.listen(EnvConfig.http.port)
  .on(`listening`, () => {
    logger.info(`[Express.js] HTTP server is running on port ${EnvConfig.http.port}`)
    databaseSetup()
  })
  .on(`error`, (err: Error) => {
    logger.error(`${__filename} error: `, err.stack)
  })
