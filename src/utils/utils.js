import bcrypt from 'bcrypt';
import { Faker, en } from '@faker-js/faker';


// Bcrypt 
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

// Passport Authorization
export const authorization = (array) => {
  return async (req, res, next) => {
    let role = array.find((e) => e == req.user.payload.role)

    if (!req.user) return res.status(401).send({ status: 'error', message: 'Unauthorized' })
    if (req.user.payload.role != role) return res.status(401).send({ status: 'error', message: 'No permissions' })

    next()
  }
}

// Mock generator

const customFaker = new Faker({ locale: [en] })

const mockProducts = () => {
  return {
    id: customFaker.database.mongodbObjectId(),
    title: customFaker.commerce.product(),
    description: customFaker.commerce.productDescription(),
    code: customFaker.string.numeric(10),
    price: customFaker.number.int({ min: 500, max: 100000 }),
    stock: customFaker.number.int({ min: 1, max: 300 }),
    category: customFaker.commerce.productMaterial(),
    thumbnail: [customFaker.image.url()],
    status: customFaker.datatype.boolean({ probability: 1.0 }),
    timestamps: customFaker.date.recent()
  }
}

const mockUsers = () => {
  return {
    first_name: customFaker.person.firstName({ sex: 'female' | 'male' }),
    last_name: customFaker.person.lastName(),
    email: customFaker.internet.email(),
    age: customFaker.number.int({ min: 1, max: 80 }),
    password: customFaker.internet.password()
  }
}

export const mockGenerator = (mockQuantity, mockType) => {
  let mock = []
  let data;

  if (mockType == 'products') data = mockProducts()
  else if (mockType == 'users') data = mockUsers()

  if (mockQuantity == 1) {
    return data
  } else {
    for (let i = 0; i < mockQuantity; i++) {
      mock.push(data)
    }
    return mock
  }
}


