import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import RootProviders from './providers'

import './globals.css'
import { Box, Flex } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Employee Management App',
  description: 'A simple employee management app.',
}

export default function RootLayout ({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <RootProviders>
          <Box bg="primary.500" color="white" p={4} mb={4}>
            <Flex justify="center">
              <Box>LOGO</Box>
            </Flex>
          </Box>
          <Flex justify="center">
            <Box width="80%">
              {children}
            </Box>
          </Flex>
          {/* TODO add a footer */}
        </RootProviders>
      </body>
    </html>
  )
}
