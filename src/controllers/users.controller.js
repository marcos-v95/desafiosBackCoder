import jwt from 'jsonwebtoken'

// Services
import UserServices from '../services/user.service.js'

const services = new UserServices()

// Controllers

const userRegister = async (req, res) => {
  let register = await services.userRegisterService(req.user)

  res.send(register)
}

const userLogin = async (req, res) => {
  let dataLogin = await services.userLoginService(req.user)

  let token = jwt.sign(dataLogin, 'loginKey', { expiresIn: '30m' })
  res.cookie('loginToken', token, { httpOnly: true, maxAge: 50 * 60 * 1000 }).send({ message: 'login ok' })
}

const userLoginGithub = async (req, res) => {
  res.send({ status: 'success', message: 'Login ok' })
}

const githubCallback = async (req, res) => {
  res.redirect('/login')
}

const userCurrent = (req, res) => {
  res.send(req.user)
}


export {
  userRegister,
  userLogin,
  userLoginGithub,
  githubCallback,
  userCurrent
}