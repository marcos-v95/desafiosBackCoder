// Router
import { Router } from "express";
// Manager (FS)
import ProductManager from "../manager/productManager.js";
// Routes
const router= Router() // /api/carts
// Manager
const manager= new ProductManager('./src/files/cartsData.json')

// Endpoints

router.post('/', async (req,res)=>{
  try {
    let newCart={id:0 ,products:[]};
    let result=await manager.addProduct(newCart)

    return res.status(200).send({status:'success',payload:result})

  } catch (error) {console.log(`There is an error: --- ${error} ---`)}
})

router.get('/:cid', async (req,res)=>{
  try {
    let cartID=parseInt(req.params.cid)
    let cart= await manager.getProductById(cartID)
    let prodInCart= cart.products.map((items)=>items)

    return res.status(200).send({status:'success',payload:prodInCart})

  } catch (error) {console.log(`There is an error: --- ${error} ---`)}
})

router.post('/:cid/products/:pid', async (req,res)=>{
  try {
    let cartID=parseInt(req.params.cid)
    let productID=parseInt(req.params.pid)
    let cart= await manager.getProductById(cartID)
    
    let existInCart= await cart.products.findIndex((p)=>p.product==productID)
    
    if(existInCart==-1){
      cart.products.push({product:productID,quantity:1})
      let result= await manager.updateProduct(cartID,cart)

      return res.status(200).send({status:'success',payload:result})

    }else{
      cart.products[existInCart].quantity++
      let result= await manager.updateProduct(cartID,cart)

      return res.status(200).send({status:'success',payload:result})
    }
  } catch (error) {console.log(`There is an error: --- ${error} ---`)}
})

export default router