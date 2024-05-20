import { seedDatabase } from './seed'

seedDatabase()
  .then(() => { console.log(__filename, 'Seeding completed') })
  .catch(err => { console.error(__filename, err) })