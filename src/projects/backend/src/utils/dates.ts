import dayjs from 'dayjs'


export const isADateAfterToday = (date: string | Date): void => {
  const today = dayjs()
  const inputDate = dayjs(date, 'YYYY-MM-DD')
  if (!inputDate.isValid()) {
    throw new Error('Invalid date format. Please provide a valid date in YYYY-MM-DD format.')
  }
  if (inputDate.isAfter(today, 'day')) {
    throw new Error('Invalid date. Please provide a date before today.')
  }
  // return inputDate.isAfter(today, 'day')
}

