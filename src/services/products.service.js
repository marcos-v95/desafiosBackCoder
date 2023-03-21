import MongoDBContainer from "../dao/mongoDB.dao.js";
import productsSchema from "../dao/models/products.model.js";

export const productsDao= new MongoDBContainer('products',productsSchema)// exported only for views router

const getProductsService= async (limit, page, sort, category, status)=>{
  let products= await productsDao.getData(limit, page, sort, category, status)
  return products
}
const getProductbyIDService= async (pid)=>{
  let product= await productsDao.getDataByID(pid)
  return product
}
const createProductService= async (newProduct)=>{
  let data= await productsDao.getData()
  const{title,description,code,price,stock,category}=newProduct
  let pCode= data.payload.find(p=>p.code==code)

  if(pCode){return console.log('Error: Product with repeated code')}

  if(title && description && code && price && stock && category){
    let response= await productsDao.saveData(newProduct)
    return response
  }else{
    return console.log('Error: Missing enter fields')
  }
}
const updateProductService= async (pid,newProduct)=>{
  let response= await productsDao.updateData(pid, newProduct)
  return response
}
const deleteProductService= async (pid)=>{
  let response= await productsDao.deleteData(pid)
  return response
}

export {
  getProductsService,
  getProductbyIDService,
  createProductService,
  updateProductService,
  deleteProductService
}