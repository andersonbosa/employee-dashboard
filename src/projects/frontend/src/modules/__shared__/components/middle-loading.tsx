'use client'

import React from 'react'
import { Box, Spinner, Text } from '@chakra-ui/react'

export const MiddleLoading = (): React.ReactElement => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      flexDirection="column"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        size="xl"
        emptyColor="gray.400"
        color="blue.500"
      />
      <Text mt={4} fontSize="xl" color="gray.600">
        Loading...
      </Text>
    </Box>
  )
}

