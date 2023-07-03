// Services
import ProductsServices from "../services/products.service.js"
// import { logger } from "../utils/logger.js"
// Controllers

const services = new ProductsServices()

const getProducts = async (req, res) => {
  let products = await services.getProductsService(req.query.limit, req.query.page, req.query.sort, req.query.category, req.query.status)

  res.send(products)
}

const generateMock = async (req, res) => {
  let { mockGenerator } = await import('../utils/utils.js')
  let result = mockGenerator(100, 'products')

  res.send({ status: 'success', payload: result })
}

const getProductbyID = async (req, res) => {
  let product = await services.getProductbyIDService(req.params.pid)

  res.send(product)
}

const createProduct = async (req, res) => {
  let userOwner = req.user.payload.email
  let result = await services.createProductService(req.body, userOwner)

  res.send(result)
}

const updateProduct = async (req, res) => {
  let result = await services.updateProductService(req.params.pid, req.body)

  res.send(result)
}

const deleteProduct = async (req, res) => {
  let user = req.user.payload
  let result = await services.deleteProductService(req.params.pid, user)

  res.send(result)
}


export {
  getProducts,
  generateMock,
  getProductbyID,
  createProduct,
  updateProduct,
  deleteProduct,

}