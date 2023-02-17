// Express JS
import express from 'express';
// Dirname
import __dirname from './utils.js';
// Handlebars
import handlebars from 'express-handlebars'
// Web Sockets (Socket io)
import { Server } from 'socket.io';
// Router
import productsRouter from './routes/products.Router.js'
import cartsRouter from './routes/carts.Router.js'
import viewsRouter from './routes/views.Router.js'

// Server
const app=express()
const server=app.listen('8080',()=>console.log('Server listening on PORT 8080'))
export const io= new Server(server)

// Express Config
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Handlebars engine config
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

// Routes
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter)
app.use('/',viewsRouter)

//Socket
io.on('connect',socket=>{
  console.log('Cliente conectado! Socket ID: '+ socket.id)
  
})
