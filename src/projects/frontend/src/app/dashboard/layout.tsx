import { Box } from '@chakra-ui/layout'

export default function DashboardLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box mb={4}>
      {children}
    </Box>
  )
}
