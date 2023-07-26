// Services
import ProductsServices from "../services/products.service.js"

// Controllers

const services = new ProductsServices()

const getProducts = async (req, res) => {
  try {
    let products = await services.getProductsService(req.query.limit, req.query.page, req.query.sort, req.query.category, req.query.status)

    res.send(products)

  } catch (error) {
    next(error)
  }
}

const generateMock = async (req, res) => {
  try {
    let { mockGenerator } = await import('../utils/utils.js')
    let result = mockGenerator(100, 'products')

    res.send({ status: 'success', payload: result })

  } catch (error) {
    next(error)
  }
}

const getProductbyID = async (req, res) => {
  try {
    let product = await services.getProductbyIDService(req.params.pid)

    res.send(product)

  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    let userOwner = req.user.payload.email
    let result = await services.createProductService(req.body, userOwner)

    res.send({ status: 'success', payload: result })

  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res) => {
  try {
    let result = await services.updateProductService(req.params.pid, req.body)

    res.send(result)

  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res) => {
  try {
    let user = req.user.payload
    let result = await services.deleteProductService(req.params.pid, user)

    res.send(result)

  } catch (error) {
    next(error)
  }
}


export {
  getProducts,
  generateMock,
  getProductbyID,
  createProduct,
  updateProduct,
  deleteProduct,

}