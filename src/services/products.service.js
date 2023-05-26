import MongoDBContainer from "../dao/mongoDB.dao.js";
import productsModel from "../models/products.model.js";

export default class ProductsServices {
  constructor() {
    this.dao = new MongoDBContainer(productsModel)
  }

  async getProductsService(limit, page, sort, category, status) {
    let options = {
      limit: limit || 10,
      page: page || 1,
      sort: { price: sort },
      lean: true // lean prevents the "document hydration", sends to handlebars the document as a plain object
    }
    let query = (category || status) ? { $or: [{ category: category }, { status: status }] } : {}

    let products = await this.dao.getData(query, options)
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

  async getProductbyIDService(pid) {
    let product = await this.dao.getDataByID(pid)
    return product
  }

  async createProductService(newProduct) {
    let data = await this.dao.getData()
    const { title, description, code, price, stock, category } = newProduct
    let pCode = data.payload.find(p => p.code == code)

    if (pCode) { return console.log('Error: Product with repeated code') }

    if (title && description && code && price && stock && category) {
      let response = await this.dao.saveData(newProduct)
      return response
    } else {
      return console.log('Error: Missing enter fields')
    }
  }

  async updateProductService(pid, newProduct) {
    let response = await this.dao.updateData(pid, newProduct)
    return response
  }

  async deleteProductService(pid) {
    let response = await this.dao.deleteData(pid)
    return response
  }
}
