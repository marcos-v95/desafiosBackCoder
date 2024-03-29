import ProductsRepository from "../repositories/productsRepository.js"
// Logger
import logger from "../utils/logger.js";
// Error Handler
import CustomError from "./errors/custom.error.js";
import EnumErrors from "./errors/enums.js";
import { createProductErrorInfo } from "./errors/info.js";


export default class ProductsServices {
  constructor() {
    this.repository = new ProductsRepository();
  }

  async getProductsService(limit, page, sort, category, status) {
    let options = {
      limit: limit || 10,
      page: page || 1,
      sort: { price: sort },
      lean: true // lean prevents the "document hydration", sends to handlebars the document as a plain object
    }
    let query = (category || status) ? { $or: [{ category: category }, { status: status }] } : {}

    let products = await this.repository.getProducts(query, options)
    products.prevLink = products.hasPrevPage ? `http://localhost:8080/products?page=${products.prevPage}` : '';//link for views router
    products.nextLink = products.hasNextPage ? `http://localhost:8080/products?page=${products.nextPage}` : '';//link for views router
    products.isValid = !(page <= 0 || page > products.totalPages) //validate for views router

    return {
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      currentPage: products.page,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
      isValid: products.isValid //only for views router
    }
  }

  async getProductbyIDService(id) {
    let product = await this.repository.getProductByID(id)
    return product
  }

  async createProductService(product, owner) {
    const { title, description, code, price, stock, category } = product
    let data = await this.repository.getProducts()

    let pCode = data.docs.find(p => p.code == code)

    if (pCode) return { status: 'Error', message: 'Product with repeated code' }

    if (!title || !description || !code || !price || !stock || !category) {
      return CustomError.createError({
        name: "Product creation error",
        cause: createProductErrorInfo({ title, description, code, price, stock, category }),
        message: "Error trying to create product",
        code: EnumErrors.INVALID_TYPES_ERROR
      })
    } else {
      product.owner = owner
      let response = await this.repository.createProduct(product)
      logger.info(`[New product created] at --${response.createdAt}--`)

      return response
    }
  }

  async updateProductService(pid, newProduct) {
    let response = await this.repository.updateProduct(pid, newProduct)
    return response
  }

  async deleteProductService(pid, user) {
    let product = await this.repository.getProductByID(pid)

    if (user.role == "premium" && user.email == product.owner) {
      return await this.repository.deleteProduct({ _id: pid, owner: product.owner })

    } else if (user.role == 'admin') {
      return await this.repository.deleteProduct({ _id: pid })

    } else {
      return { status: 'error', message: 'You do not have permission to delete this product' }
    }
  }
}
