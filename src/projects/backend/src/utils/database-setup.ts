import { seedDatabase } from '../database/seed'
import { Employee } from '../models/employee.model'

export async function databaseSetup () {
  console.log(__filename, '[databaseSetup] - Seeding database...')
  const employees = await Employee.find()
  if (employees?.length === 0) {
    seedDatabase()
  } else {
    console.log(__filename, '[databaseSetup] - Database already seeded')
  }
}