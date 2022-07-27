// ---- hecho en el desafio anterior, lo deje solo para que se vea como fueron agregados los productos al archivo



// //Funcion para obtener la data del archivo y guardar objetos dentro 
// const saveData= async ()=>{
//   let containData= await fileData.getAllData();
  
//   await fileData.saveData({name:"Remera", price:2500, stock:3})
//   await fileData.saveData({name:"Pantalon", price:5000, stock:6})
//   await fileData.saveData({name:"Camisa", price:3500, stock:10})

//   console.log(containData)
// }
// saveData();
// // fileData.deleteAll()

import fileSystem from './src/modules/fileSystem.js'
import express from 'express';

const app= express();
const PORT= 8080;

const fileData= new fileSystem () //Instancia de la clase
let products=await fileData.getAllData();// Obtenemos la data parseada del archivo json

const server= app.listen(PORT,()=>{
  console.log(`Listening on PORT ${PORT}`)
})

// Endpoint que devuelve el array con los objetos del archivo
app.get('/products',async (req,res)=>{
  res.send(products)
})
// Endpoint que devuelve un producto filtrado por id, le indicamos el id por query param (?id=num)
app.get('/getProduct',async (req,res)=>{
  let queryId=req.query.id;
 
  if(queryId!==products.id){
    let filteredProduct=products.filter((product)=>product.id==queryId)
    // console.log(filteredProduct)
    return res.send(...filteredProduct);
  }
})
// Endpoint que devuleve un producto del archivo al azar
app.get('/getRandom',async (req,res)=>{
  let randomNumber= Math.floor(Math.random() * products.length+0)
  let randomProduct=products[randomNumber];
  // console.log(randomProduct)
  return res.send(randomProduct)
})