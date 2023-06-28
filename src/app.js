import express from "express";
import handlebars from 'express-handlebars'
import __dirname from './middlewares/_dirname.js';
import config from "./config/dotenv.config.js";
import cors from 'cors'

// Passport
import passport from "passport";
import initializePassport from "./config/passport.config.js";

// Cookies
import cookieParser from 'cookie-parser'

// Routes
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
import viewsRouter from './routes/views.router.js'

// Errors handler
import ErrorHandler from './middlewares/errors.js'

// Server
const app = express()
const server = app.listen(config.PORT, () => { console.log(`Server running on PORT: ${server.address().port}`) })
server.on('error', (error) => console.log(error))

// Express config
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Cors
app.use(cors())

// Passport config
initializePassport()
app.use(passport.initialize())

// Cookies
app.use(cookieParser('secretKey'))

// Routes 
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', usersRouter)
app.use('/', viewsRouter)

// Errors handler
app.use(ErrorHandler)

// Handlebars Engine config
app.engine('handlebars', handlebars.engine({
  runtimeOptions: { // resolves an error from handlebars
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');