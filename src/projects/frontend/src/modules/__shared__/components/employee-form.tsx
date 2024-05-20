'use client'

import { Box, Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { IEmployeeModel } from '../entities/employee.entity'
import { useToasty } from '../hooks/use-toast.hook'
import { ChangeEvent, FormEvent, useState } from 'react'


interface EmployeeFormProps {
  initialValues: Partial<IEmployeeModel>
  submitButtonLabel: string
  onSubmit: (formData: Omit<IEmployeeModel, '_id'>) => Promise<void>
  onCancel: () => void
  options?: {
    resetOnSuccess?: boolean
  }
}

export const EmployeeForm = ({
  initialValues,
  submitButtonLabel,
  onSubmit,
  onCancel,
  options,
}: EmployeeFormProps) => {
  const toast = useToasty()
  const [formInput, setFormInput] = useState<any>(initialValues)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormInput((prevState: any) => ({ ...prevState, [name]: value }))
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit(formInput)
      if (options?.resetOnSuccess) {
        setFormInput(initialValues)
      }
    } catch (error) {
      console.error(error)
      toast.error({ description: 'An error occurred while submitting the form.' })
    }
  }

  const handleFormReset = () => {
    setFormInput(initialValues)
    toast.info({ description: 'Form has been reset.' })
  }

  return (
    <Box p={5}>
      <form onSubmit={handleFormSubmit}>
        <FormControl id="name" isRequired mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            type="text"
            value={formInput.name || ''}
            onChange={handleChange}
            placeholder="Enter employee name"
          />
        </FormControl>
        <FormControl id="position" isRequired mb={4}>
          <FormLabel>Position</FormLabel>
          <Input
            name="position"
            type="text"
            value={formInput.position || ''}
            onChange={handleChange}
            placeholder="Enter employee position"
          />
        </FormControl>
        <FormControl id="department" isRequired mb={4}>
          <FormLabel>Department</FormLabel>
          <Input
            name="department"
            type="text"
            value={formInput.department || ''}
            onChange={handleChange}
            placeholder="Enter employee department"
          />
        </FormControl>
        <FormControl id="admissionDate" isRequired mb={4}>
          <FormLabel>Admission Date</FormLabel>
          <Input
            name="admissionDate"
            type="date"
            max={new Date().toISOString().split('T')[0]}
            value={formInput.admissionDate ? formInput.admissionDate.toString() : ''}
            onChange={handleChange}
          />
        </FormControl>
        <Box mt={8}>
          <Flex justifyContent="space-between">
            <Button colorScheme="error" onClick={onCancel}>Back</Button>
            <Button colorScheme="primary" onClick={handleFormReset}>Reset</Button>
            <Button colorScheme="success" type="submit">{submitButtonLabel}</Button>
          </Flex>
        </Box>
      </form>
    </Box>
  )
}
