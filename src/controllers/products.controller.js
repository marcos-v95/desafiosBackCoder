import { 
  getProductsService,
  getProductbyIDService,
  createProductService,
  updateProductService,
  deleteProductService
} from "../services/products.service.js"


const getProducts= async (req,res)=>{
  let products= await getProductsService()

  res.send(products)
}

const getProductbyID= async (req,res)=>{
  let product= await getProductbyIDService(req.params.pid)

  res.send(product)
}

const createProduct= async (req,res)=>{
  let result= await createProductService(req.body)

  res.send(result)
}

const updateProduct= async (req,res)=>{
  let result=await updateProductService(req.params.pid, req.body)

  res.send(result)
}

const deleteProduct= async (req,res)=>{
  let result= await deleteProductService(req.params.pid)

  res.send(result)
}

export {
  getProducts,
  getProductbyID,
  createProduct,
  updateProduct,
  deleteProduct
}