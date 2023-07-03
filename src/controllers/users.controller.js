// Json Web Token
import jwt from 'jsonwebtoken'
// Dto
import UserDto from '../dto/user.dto.js'
// Logger
import logger from '../utils/logger.js'
// Services
import UserServices from '../services/user.service.js'

const services = new UserServices()

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

const recoveryPassword = async (req, res, next) => {
  const { email } = req.body

  try {
    if (!email) res.send({ status: 'error', message: 'email is required' })

    let result = await services.recoveryPasswordService(email)

    res.send({ status: 'success', message: result })

  } catch (error) {
    console.log(error)
  }
}

const resetPassword = async (req, res) => {
  let token = req.params.token
  const { password } = req.body

  try {
    let result = await services.resetPassword(token, password)
    res.send(result)

  } catch (error) {
    // res.redirect('/recoveryPassword')
    res.send({ status: 'error', message: 'Token expired' })
  }
}

const userChangeRole = async (req, res) => {
  let id = req.params.uid

  try {
    let result = await services.changeRole(id)
    res.send(result)
  } catch (error) {
    console.log(error)
  }
}


export {
  userRegister,
  userLogin,
  userLoginGithub,
  githubCallback,
  userCurrent,
  userMock,
  recoveryPassword,
  resetPassword,
  userChangeRole
}