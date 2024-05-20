import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

type ToastStatus = 'success' | 'error' | 'warning' | 'info'

interface ToastParams {
  title?: string
  description?: string
  status?: ToastStatus
}

export const useToasty = () => {
  const chakraToast = useChakraToast()

  const showToast = ({ description, title = 'Notification', status = 'info' }: ToastParams) => {
    const options: UseToastOptions = {
      title,
      description,
      status,
      duration: 2500,
      isClosable: true,
      position: 'bottom-right',
    }
    chakraToast(options)
  }

  const success = (params: Omit<ToastParams, 'status'>) => {
    showToast({
      ...params,
      status: 'success',
    })
  }

  const error = (params: Omit<ToastParams, 'status'>) => {
    showToast({
      ...params,
      status: 'error',
    })
  }

  const warning = (params: Omit<ToastParams, 'status'>) => {
    showToast({
      ...params,
      status: 'warning',
    })
  }

  const info = (params: Omit<ToastParams, 'status'>) => {
    showToast({
      ...params,
      status: 'info',
    })
  }

  return {
    showToast,
    success,
    info,
    warning,
    error,
  }
}
