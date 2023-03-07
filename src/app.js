import express from "express"; // Express JS
import { Server} from "socket.io";
import handlebars from 'express-handlebars'

import __dirname from './utils.js';
import MongoDBContainer from "./dao/mongoDB.dao.js"
import messagesModel from "./dao/models/messages.model.js";

// Routes
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import messagesRouter from './routes/messages.router.js'

// Server
const app=express()
const PORT= process.env.PORT || 8080;
const server=app.listen(PORT, ()=>{console.log(`Server running on PORT: ${server.address().port}`)})

// Express Config
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Handlebars engine config
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

// Routes
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use('/', messagesRouter)

// Socket Server
const io= new Server(server)
const messagesDao= new MongoDBContainer('messages',messagesModel)


io.on('connection', async socket=>{
  console.log('Cliente conectado! Socket ID: '+ socket.id)
  
  const dataUpd= async ()=>{
    const messagesData= await messagesDao.getData()
    io.emit('messagesLogs',messagesData)
  }
  dataUpd()

  socket.on('message',async (data)=>{
    await messagesDao.saveData(data)
    dataUpd()
  })

})