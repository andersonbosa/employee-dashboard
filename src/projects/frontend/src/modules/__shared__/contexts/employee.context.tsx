import { ReactNode, createContext, useContext, useState } from 'react'
import { IEmployeeModel } from '../entities/employee.entity'
import { EmployeeService } from '../services/employees.service'


interface EmployeesContextData {
  employees: IEmployeeModel[]
  setEmployees: React.Dispatch<React.SetStateAction<IEmployeeModel[]>>
  fetchEmployees: () => Promise<void>
  getEmployee: (employeeId: IEmployeeModel['_id']) => Promise<IEmployeeModel>
  deleteEmployee: (employeeId: IEmployeeModel['_id']) => Promise<void>
  createEmployee: (employee: Omit<IEmployeeModel, '_id'>) => Promise<void>
  updateEmployee: (employeeId: IEmployeeModel['_id'], employee: Partial<IEmployeeModel>) => Promise<void>
}

const EmployeesContext = createContext<EmployeesContextData | undefined>(undefined)

export const useEmployees = () => {
  const context = useContext(EmployeesContext)
  if (!context) {
    throw new Error('useEmployees must be used within a EmployeesProvider')
  }
  return context
}

export const EmployeesProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<IEmployeeModel[]>([])

  const fetchEmployees = async () => {
    try {
      const data = await EmployeeService.fetchEmployees()
      setEmployees(data)
    } catch (error) {
      console.error('Failed to fetch employees', error)
    }
  }

  const getEmployee = async (employeeId: IEmployeeModel['_id']): Promise<IEmployeeModel> => {
    try {
      return await EmployeeService.getEmployee(employeeId)
    } catch (error) {
      console.error('Failed to fetch employee', error)
      throw error
    }
  }

  const createEmployee = async (employee: Omit<IEmployeeModel, '_id'>) => {
    try {
      const newEmployee = await EmployeeService.createEmployee(employee)
      setEmployees([...employees, newEmployee])
    } catch (error) {
      console.error('Failed to create employee', error)
    }
  }

  const updateEmployee = async (employeeId: IEmployeeModel['_id'], updatedEmployee: Partial<IEmployeeModel>) => {
    try {
      const updated = await EmployeeService.updateEmployee(employeeId, updatedEmployee)
      setEmployees(employees.map(emp => (emp._id === employeeId ? updated : emp)))
    } catch (error) {
      console.error('Failed to update employee', error)
    }
  }

  const deleteEmployee = async (employeeId: string) => {
    try {
      await EmployeeService.deleteEmployee(employeeId)
      setEmployees(employees.filter(employee => employee._id !== employeeId))
    } catch (error) {
      console.error('Failed to delete employee', error)
    }
  }

  return (
    <EmployeesContext.Provider value={{
      employees,
      fetchEmployees,
      setEmployees,
      getEmployee,
      createEmployee,
      updateEmployee,
      deleteEmployee
    }}>
      {children}
    </EmployeesContext.Provider>
  )
}
