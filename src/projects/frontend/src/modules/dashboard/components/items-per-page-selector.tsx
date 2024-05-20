'use client'

import { Box, Select } from "@chakra-ui/react"

interface ItemsPerPageSelectorProps {
  itemsPerPage: number
  setItemsPerPage: (itemsPerPage: number) => void
}

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({ itemsPerPage, setItemsPerPage }: ItemsPerPageSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10))
  }
  const options = [4, 8, 16, 32, 64]
  return (
    <Box mb={4}>
      <Select value={itemsPerPage} onChange={handleChange}>
        {options.map((option) => (<option key={option} value={option}> {option} </option>))}
      </Select>
    </Box>
  )
}

export default ItemsPerPageSelector
