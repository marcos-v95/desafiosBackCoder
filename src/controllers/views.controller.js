import MongoDBContainer from "../dao/mongoDB.dao.js";
import cartsModel from "../models/carts.model.js";
import productsModel from "../models/products.model.js";

const productsDao = new MongoDBContainer(productsModel)
const cartsDao = new MongoDBContainer(cartsModel)

const viewProduct = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let data = await productsDao.getData(1, page)
  res.render('products', data)
}

const viewCart = async (req, res) => {
  let data = await cartsDao.getDataByID(req.params.cid)
  res.render('carts', data)
}

const viewHome = async (req, res) => {

  res.render('home', {})
}

const viewRegister = async (req, res) => {

  res.render('register', {})
}

const viewLogin = async (req, res) => {
  let user = req.user

  if (user) { user = req.user.payload }

  res.render('login', {
    exists: (user) ? true : false,
    user
  })
}

const viewLogout = async (req, res) => {
  res.cookie('loginToken', '', { maxAge: 1 }).redirect('/')
}

export {
  viewProduct,
  viewCart,
  viewHome,
  viewRegister,
  viewLogin,
  viewLogout
}