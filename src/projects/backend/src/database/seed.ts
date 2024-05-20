import axios from 'axios'
import { faker } from '@faker-js/faker'

const apiUrl = 'http://localhost:3000/api/employees'

const generateRandomEmployee = () => ({
  name: faker.person.fullName(),
  position: faker.person.jobTitle(),
  department: faker.commerce.department(),
  admissionDate: faker.date.past().toISOString().split('T')[0], // Generate a past date in the format YYYY-MM-DD
})

const employees = Array.from({ length: 32 }, generateRandomEmployee)

const createEmployee = async (employee: typeof employees[0]) => {
  try {
    const response = await axios.post(apiUrl, employee, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log(`INFO: Employee ${employee.name} created successfully`, response.data)
  } catch (error) {
    console.error(`ERROR: creating employee ${employee.name}`, error)
  }
}

export const seedDatabase = async () => {
  for (const employee of employees) {
    await createEmployee(employee)
  }
}

