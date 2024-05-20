'use client'

import { Box, Input } from "@chakra-ui/react"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }): JSX.Element => (
  <Box>
    <Input
      placeholder="Search employees"
      value={searchTerm}
      onChange={(e: any) => setSearchTerm(e.target.value)}
      mb={4}
    />
  </Box>
)

export default SearchBar