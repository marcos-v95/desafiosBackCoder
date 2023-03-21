import express from "express"; // Express JS
import handlebars from 'express-handlebars'

import __dirname from './utils.js';

// Routes
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'

// Server
const app=express()
const PORT= process.env.PORT || 8080;
const server=app.listen(PORT, ()=>{console.log(`Server running on PORT: ${server.address().port}`)})
server.on('error',(error)=>console.log(error))

// Express Config
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Handlebars engine config
app.engine('handlebars',handlebars.engine({
  runtimeOptions: { //resolves an error from handlebars
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

// Routes
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use('/',viewsRouter)