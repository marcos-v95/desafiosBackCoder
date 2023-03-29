// Services
import {
  userRegisterService,
  userLoginService
} from "../services/user.service.js"

// Controllers

const userRegister= async (req,res)=>{
  let register= await userRegisterService(req.body)

  res.send(register)
}

const userLogin= async (req,res)=>{
  let dataLogin = await userLoginService(req.body)
  
  req.session.name= dataLogin.first_name
  req.session.last= dataLogin.last_name
  req.session.age=dataLogin.age
  req.session.email= dataLogin.email
  
  // res.send(dataLogin)
  res.redirect('/login')
}
export {
  userRegister,
  userLogin
}