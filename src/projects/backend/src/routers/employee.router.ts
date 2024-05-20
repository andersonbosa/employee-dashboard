
import express from 'express'
import { EmployeeController } from '../controllers/employee.controller'

const EmployeeRouter = express.Router()

EmployeeRouter.get('/employees', EmployeeController.getAllEmployees)
EmployeeRouter.get('/employees/:id', EmployeeController.getEmployeeById)
EmployeeRouter.post('/employees', EmployeeController.createEmployee)
EmployeeRouter.put('/employees/:id', EmployeeController.updateEmployee)
EmployeeRouter.delete('/employees/:id', EmployeeController.deleteEmployee)

export { EmployeeRouter }