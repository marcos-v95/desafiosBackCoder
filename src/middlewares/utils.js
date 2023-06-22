import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { Faker, en } from '@faker-js/faker';

// Dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default __dirname

// Bcrypt 
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

// Passport Authorization
export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send({ status: 'error', message: 'Unauthorized' })
    if (req.user.payload.role != role) return res.status(401).send({ status: 'error', message: 'No permissions' })
    next()
  }
}

// Mock generator
export const generateProducts = (numOfProducts) => {
  const customFaker = new Faker({ locale: [en] })
  let mock = []

  for (let i = 0; i < numOfProducts; i++) {
    mock.push({
      id: customFaker.database.mongodbObjectId(),
      title: customFaker.commerce.product(),
      description: customFaker.commerce.productDescription(),
      code: customFaker.string.numeric(10),
      price: customFaker.number.int({ min: 500, max: 100000 }),
      stock: customFaker.number.int({ min: 1, max: 50 }),
      category: customFaker.commerce.productMaterial(),
      thumbnail: [customFaker.image.url()],
      status: customFaker.datatype.boolean({ probability: 1.0 }),
      timestamps: customFaker.date.recent()
    })
  }
  return mock
}
