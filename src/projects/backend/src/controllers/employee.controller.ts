import express, { Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { Employee } from '../models/employee.model'
import { isADateAfterToday } from '../utils/dates'

export class EmployeeController {
  static async getAllEmployees (req: Request, res: Response) {
    try {
      const employees = await Employee.find()
      return res.status(StatusCodes.OK).json({
        data: employees,
        metadata: {
          total: employees.length
        }
      })
    } catch (error: any) {
      console.error(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) })
    }
  }

  static async getEmployeeById (req: Request, res: Response) {
    const { id } = req.params
    try {
      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) })
      }
      const employee = await Employee.findById(id)
      if (!employee) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) })
      }
      return res.status(StatusCodes.OK).json({ data: employee })
    } catch (error: any) {
      console.error(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) })
    }
  }

  static async createEmployee (req: Request, res: Response) {
    const employeeDTO = req.body
    try {
      /* TODO Improve errors treatment with specific and centralized errors. */
      if (
        !employeeDTO?.name ||
        !employeeDTO?.position ||
        !employeeDTO?.department
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) })
      }
      isADateAfterToday(employeeDTO.admissionDate)

      const newEmployee = new Employee(employeeDTO)
      await newEmployee.save()
      return res.status(StatusCodes.CREATED).json({
        message: 'Employee created successfully',
        data: newEmployee
      })
    } catch (error: any) {
      console.error(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          message: error.message
        })
    }
  }

  static async updateEmployee (req: Request, res: Response) {
    const { id } = req.params
    const employeeDTO = req.body
    try {
      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) })
      }
      if (!employeeDTO) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) })
      }
      isADateAfterToday(employeeDTO.admissionDate)
      const updatedEmployee = await Employee.findByIdAndUpdate(id, employeeDTO, { new: true })
      if (!updatedEmployee) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) })
      }
      return res.status(StatusCodes.OK).json({
        data: updatedEmployee,
        message: 'Employee updated successfully'
      })
    } catch (error: any) {
      console.error(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) })
    }
  }

  static async deleteEmployee (req: Request, res: Response) {
    const { id } = req.params
    try {
      const deletedUser = await Employee.findByIdAndDelete(id)
      if (!deletedUser) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) })
      }
      return res.status(StatusCodes.OK).json({
        data: deletedUser,
        message: 'Employee deleted successfully.'
      })
    } catch (error: any) {
      console.error(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) })
    }
  }
}
