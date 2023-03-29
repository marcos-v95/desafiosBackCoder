import MongoDBContainer from "../dao/mongoDB.dao.js";
import usersSchema from "../dao/models/users.model.js";

export const usersDao= new MongoDBContainer('users',usersSchema) // exported only for views router

const userRegisterService= async (user)=>{
  const { first_name ,last_name ,email , age, password }= user;
  if(!first_name || !last_name || !email || !age || !password) return {status:'error', message:'All fields are required'}
  if( email=='adminCoder@coder.com'&& password=='adminCoder123') user.role='admin'
  
  let exist =await usersDao.model.findOne({email:user.email})
  if (exist) return {status:'error', message:'The user is already registered'}
  
  let result= await usersDao.saveData(user)
  return result
}

const userLoginService= async (user)=>{
  
  if(!user.email || !user.password) return {status:'error', message:'All fields are required'}
  let result= await usersDao.model.findOne({email:user.email})

  if(!result) return {status:'error', message:'User not found, please register'}
  if(result.password !== user.password) return {status:'error', message:'Incorrect password'}

  return result
}
export {
  userRegisterService,
  userLoginService
}