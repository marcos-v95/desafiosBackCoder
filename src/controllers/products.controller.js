// Services
import ProductsServices from "../services/products.service.js"

// Controllers

const services = new ProductsServices()

const getProducts = async (req, res) => {
  let products = await services.getProductsService(req.query.limit, req.query.page, req.query.sort, req.query.category, req.query.status)

  res.send(products)
}

const generateMock = async (req, res) => {
  let { generateProducts } = await import('../middlewares/mock.js')
  let result = generateProducts(100)

  res.send({ status: 'success', payload: result })
}

const getProductbyID = async (req, res) => {
  let product = await services.getProductbyIDService(req.params.pid)

  res.send(product)
}

const createProduct = async (req, res) => {
  let result = await services.createProductService(req.body)

  res.send(result)
}

const updateProduct = async (req, res) => {
  let result = await services.updateProductService(req.params.pid, req.body)

  res.send(result)
}

const deleteProduct = async (req, res) => {
  let result = await services.deleteProductService(req.params.pid)

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