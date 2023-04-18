// Services
import {
  userRegisterService,
  userLoginService
} from "../services/user.service.js"

// Controllers

const userRegister = async (req, res) => {
  let register = await userRegisterService(req.user)

  res.send(register)
}

const userLogin = async (req, res) => {
  let dataLogin = await userLoginService(req.user)

  req.session.user = {
    first_name: dataLogin.payload.first_name,
    last_name: dataLogin.payload.last_name,
    age: dataLogin.payload.age,
    email: dataLogin.payload.email
  }

  res.send(req.session.user)
}

const userLoginGithub = async (req, res) => {
  res.send({ status: 'success', message: 'Login ok' })
}
const githubCallback = async (req, res) => {
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email
  }
  res.redirect('/login')
}


export {
  userRegister,
  userLogin,
  userLoginGithub,
  githubCallback
}