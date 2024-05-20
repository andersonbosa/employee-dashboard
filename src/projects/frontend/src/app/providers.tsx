'use client' /* TOFIX Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it. */

import { EmployeesProvider } from '@/modules/__shared__/contexts/employee.context'
import { defaultTheme } from '@/modules/__shared__/themes/default'
import { ChakraProvider } from '@chakra-ui/react'
import { DashboardProvider } from '../modules/__shared__/contexts/dashboard.context'


export default function RootProviders ({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ChakraProvider theme={defaultTheme}>
      {/* <ToastProvider> */}
        <EmployeesProvider>
          <DashboardProvider>
            {children}
          </DashboardProvider>
        </EmployeesProvider>
      {/* </ToastProvider> */}
    </ChakraProvider>
  )
}

