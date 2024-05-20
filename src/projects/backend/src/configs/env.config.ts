import { configDotenv } from 'dotenv'
configDotenv()

export const isProduction = (): boolean => process.env.NODE_ENV === 'production'

export const EnvConfig = {
  http: {
    port: Number(process.env.HTTP_PORT) || 3000
  },
  mongodb: {
    connectionUri: process.env.MONGODB_URI ?? 'mongodb://user:password@localhost:27017/db_name'
  }
}