// contexts/DashboardContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useEmployees } from './employee.context'
import { IEmployeeModel } from '../entities/employee.entity'


interface DashboardContextData {
  sortedEmployees: IEmployeeModel[]
  sortEmployees: (by: keyof IEmployeeModel) => void
  filterEmployees: (query: string) => void
}

const DashboardContext = createContext<DashboardContextData | undefined>(undefined)

export const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  
  
  const [sortedEmployees, setSortedEmployees] = useState<IEmployeeModel[]>([])
  
  const { employees } = useEmployees()

  const sortEmployees = (by: keyof IEmployeeModel) => {
    const sorted = [...employees].sort((a, b) => (a[by] > b[by] ? 1 : -1))
    setSortedEmployees(sorted)
  }

  const filterEmployees = (query: string) => {
    const filtered = employees.filter(
      (employee: any) =>
        Object.values(employee).some((value: any) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
    )
    setSortedEmployees(filtered)
  }

  return (
    <DashboardContext.Provider value={{
      sortedEmployees,
      filterEmployees,
      sortEmployees
    }}>
      {children}
    </DashboardContext.Provider>
  )
}
