import jwt from 'jsonwebtoken'

// Services
import UserServices from '../services/user.service.js'

const services = new UserServices()

// Dto
import UserDto from '../dto/user.dto.js'

// Controllers

const userRegister = async (req, res) => {
  let register = await services.getUserService(req.user)

  res.send({ status: 'success', message: 'Register ok' })
}

const userLogin = async (req, res) => {
  let payload = await services.getUserService(req.user)

  let token = jwt.sign({ payload }, 'loginKey', { expiresIn: '30m' })
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
  userCurrent
}