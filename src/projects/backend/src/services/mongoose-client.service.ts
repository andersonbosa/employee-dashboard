import debug from 'debug'
import mongoose from 'mongoose'
import { EnvConfig } from '../configs/env.config'
import { logger } from './logger.service'
debug('mongoose')


mongoose.connect(
  EnvConfig.mongodb.connectionUri,
)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error)
    throw error
  })

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  logger.info('MongoDB connection closed')
  process.exit(0)
})


mongoose.connection.on('close', () => {
  logger.info('MongoDB connection closed')
})

export { mongoose }
