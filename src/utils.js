import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'


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
    if (req.user.role != role) return res.status(401).send({ status: 'error', message: 'No permissions' })
    next()
  }
}