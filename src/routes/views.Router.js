// Router
import { Router } from "express";
// Manager
import ProductManager from "../modules/productManager.js";

const router= Router()

const manager=new ProductManager('./src/files/productsData.json')

// Endpoint
router.get('/',async (req,res)=>{
  let products= await manager.getProducts()
  
  res.render('home',{
    hasProducts:products.length>0,
    products
  })
})

router.get('/realtimeproducts',(req,res)=>{
  
  res.render('realTimeProducts',{})
})

export default router