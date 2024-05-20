'use client'

import { EmployeeForm } from '@/modules/__shared__/components/employee-form'
import { Heading2 } from '@/modules/__shared__/components/heading2'
import { PAGES_PATH } from '@/modules/__shared__/constants'
import { useEmployees } from '@/modules/__shared__/contexts/employee.context'
import { IEmployeeModel } from '@/modules/__shared__/entities/employee.entity'
import { useToasty } from '@/modules/__shared__/hooks/use-toast.hook'

import { Box } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const AddEmployeeModulePage = () => {
  const toast = useToasty()
  const router = useRouter()
  const { createEmployee } = useEmployees()

  const INITIAL_FORM = { admissionDate: dayjs().format('YYYY-MM-DD') }
  const [initialFormData, setInitialFormData] = useState<Partial<IEmployeeModel>>(INITIAL_FORM)

  const handleCancel = () => {
    router.push(PAGES_PATH.DASHBOARD)
  }

  const handleAddEmployee = async (formData: Omit<IEmployeeModel, '_id'>): Promise<void> => {
    createEmployee(formData)
      .then(() => {
        toast.success({ description: 'Employee added successfully' })
      })
      .catch(() => toast.error({ description: 'Failed to add employee' }))
  }

  const handleSuccess = (): void => {
    setInitialFormData((_: any) => INITIAL_FORM)
  }

  return (
    <Box p={5}>
      <Heading2>Add Employee</Heading2>
      <EmployeeForm
        initialValues={initialFormData}
        submitButtonLabel="Add Employee"
        onSubmit={handleAddEmployee}
        onCancel={handleCancel}
        options={{ resetOnSuccess: true }}
      />
    </Box>
  )
};

