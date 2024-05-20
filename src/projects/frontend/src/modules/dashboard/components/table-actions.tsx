import { PAGES_PATH } from '@/modules/__shared__/constants'
import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { useState } from 'react'


interface TableActionsProps {
  onReload: () => Promise<void>
}

const TableActions: React.FC<TableActionsProps> = ({ onReload }) => {
  const [isReloading, setIsReloading] = useState(false)

  const handleReload = async () => {
    setIsReloading(true)
    await onReload()
    setIsReloading(false)
  }

  return (
    <Box my={4}>
      <Flex justifyContent={'space-between'}>
        <Link href={PAGES_PATH.EMPLOYEE_ADD}>
          <Button colorScheme="primary" mb={4}>Add Employee</Button>
        </Link>
        <Button colorScheme="primary" onClick={handleReload} disabled={isReloading}>Reload</Button>
      </Flex>
    </Box>
  )
}

export default TableActions
