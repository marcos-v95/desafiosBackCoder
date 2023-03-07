import MongoDBContainer from "../dao/mongoDB.dao.js";
import productsSchema from "../dao/models/products.model.js";

const productsDao= new MongoDBContainer('products',productsSchema)

const getProductsService= async ()=>{
  let products= await productsDao.getData()

  return products
}
const getProductbyIDService= async (pid)=>{
  let product= await productsDao.getDataByID(parseInt(pid))
  return product
}
const createProductService= async (newProduct)=>{
  let data= await productsDao.getData()
  const{title,description,code,price,stock,category}=newProduct
  let pCode= data.find((p)=>p.code==code)

  if(pCode){return console.log('Error: Product with repeated code')}

  if(title && description && code && price && stock && category){
    let response= await productsDao.saveData(newProduct)
    return response
  }else{
    return console.log('Error: Missing enter fields')
  }
}
const updateProductService= async (pid,newProduct)=>{
  let response= await productsDao.updateData(parseInt(pid), newProduct)
  return response
}
const deleteProductService= async (pid)=>{
  let response= await productsDao.deleteData(parseInt(pid))
  return response
}

export {
  getProductsService,
  getProductbyIDService,
  createProductService,
  updateProductService,
  deleteProductService
}