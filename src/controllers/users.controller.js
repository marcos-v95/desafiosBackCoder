import jwt from 'jsonwebtoken'
import logger from '../utils/logger.js'

// Services
import UserServices from '../services/user.service.js'

const services = new UserServices()

// Dto
import UserDto from '../dto/user.dto.js'

// Controllers

const userMock = async (req, res) => {
  let { mockGenerator } = await import('../utils/utils.js')
  let result = mockGenerator(1, 'users')

  res.send(result)
}

const userRegister = async (req, res) => {
  let register = await services.getUserService(req.user)
  logger.info('User successfully register in')

  res.send({ status: 'success', message: 'Register ok' })
}

const userLogin = async (req, res) => {
  let payload = await services.getUserService(req.user)
  let token = jwt.sign({ payload }, 'loginKey', { expiresIn: '30m' })

  logger.info('User successfully logged in')

  res.cookie('loginToken', token, { httpOnly: true, maxAge: 50 * 60 * 1000 }).send({ message: 'login ok' })
}

const userLoginGithub = async (req, res) => {
  res.send({ status: 'success', message: 'Login ok' })
}

const githubCallback = async (req, res) => {
  res.redirect('/login')
}

const userCurrent = (req, res) => {
  res.send(new UserDto(req.user.payload))
}


export {
  userRegister,
  userLogin,
  userLoginGithub,
  githubCallback,
  userCurrent,
  userMock
}