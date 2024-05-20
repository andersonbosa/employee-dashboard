'use client'

import { Box, Select } from "@chakra-ui/react"

export type SortOrderTypes = 'asc' | 'desc'

interface SortControlProps {
  sortCriteria: string
  setSortCriteria: (criteria: string) => void
  sortOrder: SortOrderTypes
  setSortOrder: (order: SortOrderTypes) => void
}

const SortControl: React.FC<SortControlProps> = ({ sortCriteria, setSortCriteria, sortOrder, setSortOrder }: SortControlProps) => {
  const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value)
  }

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as SortOrderTypes)
  }

  return (
    <Box display="flex" alignItems="center" mb={4}>
      <Select value={sortCriteria} onChange={handleCriteriaChange} mr={2}>
        <option value="name">Name</option>
        <option value="position">Position</option>
        <option value="department">Department</option>
      </Select>
      <Select value={sortOrder} onChange={handleOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
    </Box>
  )
}

export default SortControl
