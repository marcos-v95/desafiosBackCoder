import MongoDBContainer from "../dao/mongoDB.dao.js"
import cartsModel from "../dao/models/carts.model.js"

const cartsDao= new MongoDBContainer('carts',cartsModel)

const getCartService= async (cid)=>{
  let data= await cartsDao.getData()
  let cart=data.find((c)=>c.id==cid)
  let prodInCart= cart.products.map((items)=>items)
  return prodInCart
}
const createCartService= async (newCart)=>{
  let response= await cartsDao.saveData(newCart)

  return response
}
const addProductinCartService= async (cid,pid)=>{
  let data= await cartsDao.getData()
  let cart= data.find((e)=>e.id==cid)
  let exist= cart.products.findIndex((e)=>e.product==pid)
  
  if(exist==-1){
    cart.products.push({product:pid,quantity:1})
    let result= await cartsDao.updateData(cid,cart)

    return result
  }else{
    cart.products[exist].quantity++
    let result= await cartsDao.updateData(cid,cart)

    return result
  }
}

export {
  getCartService,
  createCartService,
  addProductinCartService
}