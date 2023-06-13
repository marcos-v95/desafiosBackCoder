import DaosFactory from "../dao/factory.js"
import config from "../config/dotenv.config.js"


class ProductsRepository {
  constructor() {
    this.dao = DaosFactory.createProducts(config.DAO)
  }

  async getProducts(query, options) {
    return await this.dao.getData(query, options)
  }

  async getProductByID(id) {
    return await this.dao.getDataByID(id)
  }

  async createProduct(data) {
    return await this.dao.saveData(data)
  }

  async updateProduct(id, product) {
    return await this.dao.updateData(id, product)
  }

  async deleteProduct(id) {
    return await this.dao.deleteData(id)
  }
}

export default ProductsRepository