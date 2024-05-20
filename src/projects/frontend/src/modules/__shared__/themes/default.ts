import { extendTheme } from '@chakra-ui/react'


/* TODO chakra ui custom theme */
const Button = {
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sizes: {
    xl: {
      h: '56px',
      fontSize: 'lg',
      px: '32px',
    },
  },
  variants: {
    primary: {
      bg: 'secondary.500',
      color: 'white',
      _hover: {
        bg: 'primary.600',
      },
    },
  },
}

const colors = {
  success: {
    100: '#E6F9ED',
    200: '#C7F2D6',
    300: '#A3E9BD',
    400: '#7FD8A3',
    500: '#62BF88',
    600: '#4AA374',
    700: '#308764',
    800: '#166454',
    900: '#084C3C',
  },
  error: {
    100: '#FFE8E8',
    200: '#FFC7C7',
    300: '#FFA3A3',
    400: '#FF7A7A',
    500: '#FF5252',
    600: '#E60000',
    700: '#B80000',
    800: '#920000',
    900: '#730000',
  },
  primary: {
    100: '#E3F2F9',
    200: '#C5E4F3',
    300: '#A2D4EC',
    400: '#7AC1E4',
    500: '#47A9DA',
    600: '#0088CC',
    700: '#007AB8',
    800: '#006BA1',
    900: '#005885',
  },
  secondary: {
    100: '#FEEBC8',
    200: '#FBD38D',
    300: '#F6AD55',
    400: '#ED8936',
    500: '#DD6B20',
    600: '#C05621',
    700: '#9C4221',
    800: '#7B341E',
    900: '#652B19',
  },
}

export const defaultTheme = extendTheme({
  colors,
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  components: {
    Button
  },
})

