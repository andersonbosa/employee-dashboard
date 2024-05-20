import { httpClient } from '../api/http'
import { Employee, IEmployeeModel } from '../entities/employee.entity'


export const EmployeeService = {
  async fetchEmployees (): Promise<IEmployeeModel[]> {
    try {
      const response = await httpClient.v1.get('/api/employees')
      return response.data.data.map(
        (_employee: IEmployeeModel) => new Employee(_employee)
      )

    } catch (error) {
      console.error('Failed to fetch employees', error)
      throw error
    }
  },

  async getEmployee (employeeId: IEmployeeModel['_id']): Promise<IEmployeeModel> {
    try {
      const response = await httpClient.v1.get(`/api/employees/${employeeId}`)
      return new Employee(response.data.data)
    } catch (error) {
      console.error('Failed to fetch employee', error)
      throw error
    }
  },

  async createEmployee (employee: Omit<IEmployeeModel, '_id'>): Promise<IEmployeeModel> {
    try {
      const response = await httpClient.v1.post('/api/employees', employee)
      return new Employee(response.data.data)
    } catch (error) {
      console.error('Failed to create employee', error)
      throw error
    }
  },

  async updateEmployee (employeeId: IEmployeeModel['_id'], updatedEmployee: Partial<IEmployeeModel>): Promise<IEmployeeModel> {
    try {
      const response = await httpClient.v1.put(`/api/employees/${employeeId}`, updatedEmployee)
      return new Employee(response.data.data)
    } catch (error) {
      console.error('Failed to update employee', error)
      throw error
    }
  },

  async deleteEmployee (employeeId: IEmployeeModel['_id']): Promise<void> {
    try {
      await httpClient.v1.delete(`/api/employees/${employeeId}`)
    } catch (error) {
      console.error('Failed to delete employee', error)
      throw error
    }
  }
}
