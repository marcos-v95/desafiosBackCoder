import dotenv from 'dotenv';

dotenv.config()

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV
}

export default config