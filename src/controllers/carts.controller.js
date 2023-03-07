import { 
  getCartService,
  createCartService,
  addProductinCartService
} from "../services/carts.service.js"


const getCart= async (req,res)=>{
  let cart= await getCartService (parseInt(req.params.cid))

  res.send(cart)
}

const createCart= async (req,res)=>{
  let newCart={products:[]}
  let result= await createCartService(newCart)

  res.send(result)
}

const addProductinCart= async (req,res)=>{
  let result= await addProductinCartService(parseInt(req.params.cid), parseInt(req.params.pid))

  res.send(result)
}

export {
  getCart,
  createCart,
  addProductinCart
}