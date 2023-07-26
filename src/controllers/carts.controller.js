// Services
import CartServices from "../services/carts.service.js"

const services = new CartServices()

// Controllers

const getCart = async (req, res, next) => {
  try {
    let cart = await services.getCartService(req.params.cid)

    res.send(cart)

  } catch (error) {
    next(error)
  }
}

const createCart = async (req, res, next) => {
  try {
    let cart = { products: [] }
    let result = await services.createCartService(cart)

    res.send(result)

  } catch (error) {
    next(error)
  }
}

const addProductinCart = async (req, res, next) => {
  try {
    let { quantity } = req.body
    if (!quantity) quantity = 1
    let user = req.user.payload

    let result = await services.addProductinCartService(req.params.cid, req.params.pid, quantity, user)

    res.send(result)

  } catch (error) {
    next(error)
  }
}

const deleteProductinCart = async (req, res, next) => {
  try {
    let result = await services.deleteProductinCartService(req.params.cid, req.params.pid)

    res.send(result)

  } catch (error) {
    next(error)
  }
}

const cleanCart = async (req, res, next) => {
  try {
    let result = await services.cleanCartService(req.params.cid)

    res.send(result)

  } catch (error) {
    next(error)
  }
}

const updateCart = async (req, res, next) => {
  try {
    let result = await services.updateCartService(req.params.cid, req.body)

    res.send(result)

  } catch (error) {
    next(error)
  }
}

const updateProductinCart = async (req, res, next) => {
  try {
    let result = await services.updateProductinCartService(req.params.cid, req.params.pid, req.body)

    res.send(result)

  } catch (error) {
    next(error)
  }
}

const checkOut = async (req, res, next) => {
  try {
    let result = await services.checkOutService(req.params.cid, req.user)

    res.send(result)

  } catch (error) {
    next(error)
  }
}

export {
  getCart,
  createCart,
  addProductinCart,
  deleteProductinCart,
  cleanCart,
  updateCart,
  updateProductinCart,
  checkOut
}