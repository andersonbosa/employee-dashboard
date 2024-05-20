'use client'

import { useEffect, useState } from 'react'
import { Box, Flex } from "@chakra-ui/react"

import Pagination, { paginationCalculations } from '@/modules/__shared__/components/pagination'
import { useEmployees } from '@/modules/__shared__/contexts/employee.context'
import { useToasty } from '@/modules/__shared__/hooks/use-toast.hook'
import { IEmployeeModel } from '@/modules/__shared__/entities/employee.entity'

import EmployeeTable from '../components/employee-table'
import SearchBar from '../components/search-bar'
import TableActions from '../components/table-actions'
import SortControl from '../components/sort-control'
import ItemsPerPageSelector from '../components/items-per-page-selector'

export const DashboardModulePage = () => {
  const toast = useToasty()
  const { employees, setEmployees, fetchEmployees, deleteEmployee } = useEmployees()

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [sortCriteria, setSortCriteria] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => { handleFetchEmployees() }, [])

  const handleFetchEmployees = async (): Promise<void> => {
    setEmployees([])
    fetchEmployees()
      .then(() => { toast.success({ description: 'Employees load successfully' }) })
      .catch((error) => { toast.error({ description: error.message }) })
  }

  const handlePageChange = async (page: number): Promise<void> => {
    setCurrentPage(page)
  }

  const sortEmployees = (employees: IEmployeeModel[]) => {
    return employees.sort((a, b) => {
      const valueA = a[sortCriteria as keyof IEmployeeModel]
      const valueB = b[sortCriteria as keyof IEmployeeModel]

      if (valueA == null || valueB == null) {
        return 0
      }
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
      }
      if (valueA instanceof Date && valueB instanceof Date) {
        return sortOrder === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime()
      }
      return 0
    })
  }

  const filteredAndSortedEmployees = sortEmployees(
    employees.filter((employee: IEmployeeModel) =>
      JSON.stringify(employee).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const { currentItems: currentEmployees, totalPages } = paginationCalculations({
    items: filteredAndSortedEmployees,
    itemsPerPage,
    currentPage,
  })

  return (
    <Box>
      <Box>
        <Flex justifyContent={'space-between'}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Flex gap={2}>
            <SortControl sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} sortOrder={sortOrder} setSortOrder={setSortOrder} />
            <ItemsPerPageSelector itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
          </Flex>
        </Flex>
      </Box>

      <TableActions onReload={handleFetchEmployees} />
      <EmployeeTable employees={currentEmployees} onDelete={deleteEmployee} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </Box>
  )
}
