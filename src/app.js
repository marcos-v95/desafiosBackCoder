// Modules
const express=require('express')
const app=express()
const productManager=require('./manager/productManager.js');

// Server
const server=app.listen('8080',()=>console.log('Server listening on PORT 8080'))
app.use(express.urlencoded({extended:true}))

const manager= new productManager('src/files/data.json')

// Routes
app.get('/products',async (req,res)=>{
  try {
    let data=await manager.getProducts();
    let plimit=req.query.limit;
    
    if (plimit){
      let filter=data.filter((element,index)=>index < plimit)
      return res.send(filter)
    }else if (data.length == 0 || null || undefined){
      return res.send({error:'No existen productos!'})
    }else{
      return res.send(data)
    }

  } catch (error) {console.log(error)}
})

app.get('/products/:pid',async (req,res)=>{
  try {
    let data=await manager.getProducts();
    let paramId=req.params.pid;

    if(paramId == 0 || paramId > data.length || String || null || undefined){
      return res.send({error:'Producto no encontrado'})
    }else{
      let result= data.find((prod)=>prod.id==paramId)
      return res.send(result)
    }

  } catch (error) {console.log(error)}
})
