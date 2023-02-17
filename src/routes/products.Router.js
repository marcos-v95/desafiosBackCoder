// Router
import { Router } from "express";
// Manager (FS)
import ProductManager from "../modules/productManager.js";
// Routes
const router= Router() // /api/products
// Socket io
import {io} from "../app.js";
// Manager
const manager= new ProductManager('./src/files/productsData.json')

// Endpoints
router.get('/',async (req,res)=>{
  try {
    let data=await manager.getProducts();
    let pLimit=req.query.limit;
    
    if (pLimit){
      let filter=data.filter((element,index)=>index < pLimit)
      return res.status(200).send({status:'success',payload:filter})

    }else if (data.length == 0 || null || undefined){
      return res.send({error:'No existen productos!'})

    }else{
      return res.status(200).send({status:'success',payload:data})
    }

  } catch (error) {console.log(`There is an error: --- ${error} ---`)}
})

router.get('/:pid',async (req,res)=>{
  try {
    let data=await manager.getProducts();
    let paramID=parseInt(req.params.pid);

    if(paramID == 0 || paramID > data.length || null || undefined){
      return res.send({error:'Producto no encontrado'})

    }else{
      let result= data.find((prod)=>prod.id==paramID)
      return res.status(200).send({status:'success',payload:result})
    }

  } catch (error) {console.log(`There is an error: --- ${error} ---`)}
})
router.post('/', async (req,res)=>{
  try {
    let data= await manager.getProducts()
    let newProduct=req.body;
    const{title,description,code,price,stock,category}=newProduct
    let pCode= data.find((element)=> element.code==code)
    
    if(pCode){
      return res.send(console.log('Error: Product with repeated code'))

    }else if(title&&description&&code&&price&&stock&&category){
      newProduct.status=true
      newProduct.thumbnail=[]
      
      let result= await manager.addProduct(newProduct)
      
      io.emit('product',result)

      return res.status(200).send({status:'success',payload:result})
    }else{
      return res.send(console.log('Error: Missing enter fields'))
    }
    
  } catch (error) {console.log(`There is an error: --- ${error} ---`)}
})
router.put('/:pid',async (req,res)=>{
  try {
    let product= req.body
    let paramID= parseInt(req.params.pid)
    let result= await manager.updateProduct(paramID,product)

    return res.status(200).send({status:'success',payload:result})
    
  } catch (error) {console.log(`There is an error: --- ${error} ---`)}
})
router.delete('/:pid', async (req,res)=>{
  try {
    let paramID= parseInt(req.params.pid)
    let result= await manager.deleteProduct(paramID)

    return res.status(200).send({status:'success',payload:result})

  } catch (error) {console.log(`There is an error: --- ${error} ---`)}
})

export default router;