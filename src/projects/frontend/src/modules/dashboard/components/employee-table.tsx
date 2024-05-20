import { PAGES_PATH } from '@/modules/__shared__/constants'
import { IEmployeeModel } from '@/modules/__shared__/entities/employee.entity'
import { Box, Button, Flex, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import Link from 'next/link'
import { useState } from 'react'


interface EmployeeTableProps {
  employees: IEmployeeModel[]
  onDelete: (id: string) => void
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onDelete }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof IEmployeeModel; direction: 'asc' | 'desc' } | null>(null)

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortConfig) return 0
    const direction = sortConfig.direction === 'asc' ? 1 : -1
    return a[sortConfig.key] < b[sortConfig.key] ? -direction : direction
  })

  const requestSort = (key: keyof IEmployeeModel) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  return (
    <Box>
      <Table variant="simple">
        <TableCaption> Employee List </TableCaption>
        <Thead>
          <Tr>
            <Th onClick={() => requestSort('name')}>Name</Th>
            <Th onClick={() => requestSort('position')}>Position</Th>
            <Th onClick={() => requestSort('department')}>Department</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedEmployees.map((employee) => (
            <Tr key={employee._id}>
              <Td>{employee.name}</Td>
              <Td>{employee.position}</Td>
              <Td>{employee.department}</Td>
              <Td>
                <Box>
                  <Flex gap={'2px'} flexDirection={'column'}>
                    <Link href={`${PAGES_PATH.EMPLOYEE_EDIT}/${employee._id}`}>
                      <Button colorScheme="primary" mr={2} height='24px' width='100%'>Edit</Button>
                    </Link>
                    <Button colorScheme="error" height='24px' width='100%' onClick={() => onDelete(employee._id)}> Delete </Button>
                  </Flex>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>

  )
}

export default EmployeeTable


