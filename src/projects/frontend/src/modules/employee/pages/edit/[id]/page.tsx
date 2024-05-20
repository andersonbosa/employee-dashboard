'use client'

import { Box } from "@chakra-ui/react"
import { redirect, useRouter } from 'next/navigation'

import { EmployeeForm } from '@/modules/__shared__/components/employee-form'
import { PAGES_PATH } from '@/modules/__shared__/constants'
import { useEmployees } from '@/modules/__shared__/contexts/employee.context'
import { IEmployeeModel } from '@/modules/__shared__/entities/employee.entity'
import { useToasty } from '@/modules/__shared__/hooks/use-toast.hook'
import { Heading2 } from '@/modules/__shared__/components/heading2'


interface IEditEmployeeModulePageProps {
  employeeId: string
}

export function EditEmployeeModulePage ({ employeeId }: IEditEmployeeModulePageProps): React.ReactElement {
  const router = useRouter()
  const toast = useToasty()
  const { employees, updateEmployee, } = useEmployees()

  const selectedEmployee: IEmployeeModel | undefined = employees.find((employee: IEmployeeModel) => employee._id === employeeId)
  if (!selectedEmployee) {
    toast.error({ description: 'Employee not found.' })
    return redirect(PAGES_PATH.DASHBOARD) 
  }

  const handleUpdateEmployee = async (formData: Partial<IEmployeeModel>) => {
    try {
      console.log('selectedEmployee', selectedEmployee)
      console.log('formData', formData)
      await updateEmployee(selectedEmployee._id, formData)
      toast.success({ description: 'The employee has been updated.', })
    } catch (error) {
      console.error(error)
      toast.error({ description: 'An error occurred while updating the employee.' })
    }
  }

  const handleCancel = () => {
    router.push(PAGES_PATH.DASHBOARD)
  }

  return (
    <Box p={5}>
      <Heading2>Update Employee</Heading2>

      <EmployeeForm
        initialValues={selectedEmployee}
        onSubmit={handleUpdateEmployee}
        onCancel={handleCancel}
        submitButtonLabel="Edit Employee"
      />
    </Box>
  )
}

