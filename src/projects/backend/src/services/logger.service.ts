import winston from 'winston'

const { combine, timestamp, printf, colorize } = winston.format

// Configuração do logger
const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`
    })
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`
        })
      )
    }),
    new winston.transports.File({ filename: 'src/logs/default.log' }),
    new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'src/logs/access.log', level: 'http' }),
    /* TODO melhoria um log só de acesso (signin, signup, signout, sign-try, etc) */
  ]
})

export { logger }