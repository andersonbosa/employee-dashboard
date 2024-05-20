import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { AuthRouter } from './auth.router'
import { EmployeeRouter } from './employee.router'


const v1 = express.Router()

v1.get('/healthcheck', async (req: express.Request, res: express.Response) => {
  return res
    .status(StatusCodes.OK)
    .json({ live: true, when: new Date() })
})

v1.use(AuthRouter)
v1.use(EmployeeRouter)

export { v1 }
