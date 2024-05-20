import { Box, Heading } from '@chakra-ui/layout'


export const Heading2 = ({ children }: Readonly<{ children: string }>): React.ReactElement => {
  return (
    <Box mb={8} >
      <Heading fontSize={'2rem'} >{children}</Heading>
    </Box>
  )
}