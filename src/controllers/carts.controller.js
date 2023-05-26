// Services
import CartServices from "../services/carts.service.js"

const services = new CartServices()

// Controllers

const getCart = async (req, res) => {
  let cart = await services.getCartService(req.params.cid)
  res.send(cart)
}

const createCart = async (req, res) => {
  let cart = { products: [] }
  let result = await services.createCartService(cart)
  res.send(result)
}

const addProductinCart = async (req, res) => {
  let result = await services.addProductinCartService(req.params.cid, req.params.pid)
  res.send(result)
}

const deleteProductinCart = async (req, res) => {
  let result = await services.deleteProductinCartService(req.params.cid, req.params.pid)
  res.send(result)
}

const cleanCart = async (req, res) => {
  let result = await services.cleanCartService(req.params.cid)
  res.send(result)
}

const updateCart = async (req, res) => {
  let result = await services.updateCartService(req.params.cid, req.body)
  res.send(result)
}

const updateProductinCart = async (req, res) => {
  let result = await services.updateProductinCartService(req.params.cid, req.params.pid, req.body)
  res.send(result)
}

export {
  getCart,
  createCart,
  addProductinCart,
  deleteProductinCart,
  cleanCart,
  updateCart,
  updateProductinCart
}