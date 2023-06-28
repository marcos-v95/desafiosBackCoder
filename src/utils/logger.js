import winston from "winston";
import config from "../config/dotenv.config.js";

const developerLogger = () => {
  const d_logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
      new winston.transports.Console({ level: 'debug' }),
      new winston.transports.File({
        // maxsize:512000,
        maxFiles: 1000,
        filename: './src/logs/errors.log',
        level: 'debug'
      })
    ]
  })

  return d_logger
}

const productionLogger = () => {
  const p_logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
      new winston.transports.Console({ level: 'info' }),
      new winston.transports.File({
        // maxsize:512000,
        maxFiles: 1000,
        filename: './src/logs/errors.log',
        level: 'info'
      })
    ]
  })

  return p_logger
}

let logger = (config.NODE_ENV == 'production') ? productionLogger() : developerLogger()

export default logger