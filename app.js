import express from 'express';
// Routes
import productsRouter from './src/routes/products.router.js'

const app= express();
const PORT= 8080;

const server= app.listen(PORT,()=>{
  console.log(`Listening on PORT ${PORT}`)
})
app.use(express.static('./src/public'))
app.use(express.json())

// // Router products
app.use('/products',productsRouter)
// // Endpoint que devuleve un producto del archivo al azar
// // app.get('/getRandom',async (req,res)=>{
// //   let randomNumber= Math.floor(Math.random() * products.length+0)
// //   let randomProduct=products[randomNumber];
// //   // console.log(randomProduct)
// //   return res.send(randomProduct)
// // })