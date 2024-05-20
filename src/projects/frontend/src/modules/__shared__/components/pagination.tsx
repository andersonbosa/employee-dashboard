'use client'

import { Box, Button, Flex } from "@chakra-ui/react"

interface PaginationCalculationInput {
  items: any[]
  currentPage: number
  itemsPerPage: number
}

interface PaginationCalculationOutput {
  currentItems: any[]
  totalPages: number
}

export const paginationCalculations = (
  { items, currentPage, itemsPerPage }: PaginationCalculationInput
): PaginationCalculationOutput => {
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(items.length / itemsPerPage)
  return { currentItems, totalPages }
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_: any, i: number) => i + 1)

  return (
    <Box>
      <Flex mt={4} justifyContent="center">
        {pages.map(page => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            colorScheme={page === currentPage ? "blue" : "gray"}
            mx={1}
          >
            {page}
          </Button>
        ))}
      </Flex>
    </Box>
  )
}

export default Pagination


