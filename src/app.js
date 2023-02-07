// Express JS
import express from 'express';
// Router
import productsRouter from './routes/products.Router.js'
import cartsRouter from './routes/carts.Router.js'

// Server
const app=express()
const server=app.listen('8080',()=>console.log('Server listening on PORT 8080'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Routes
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter)
