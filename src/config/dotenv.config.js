import dotenv from 'dotenv';

dotenv.config()

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGODB_URL,
  DAO: process.env.DAO,
  cartPopulate: process.env.cartPopulate
}

export default config