import DaosFactory from "../dao/factory.js"
import config from "../config/dotenv.config.js"

class CartsRepository {
  constructor() {
    this.dao = DaosFactory.createCarts(config.DAO)
  }

  async getCart(cid, populate) {
    return await this.dao.getDataByID(cid, populate)
  }

  async createCart(newCart) {
    return await this.dao.saveData(newCart)
  }

  async addProduct(cid, cart) {
    return await this.dao.updateData(cid, cart)
  }

  async deleteProduct(cid, cart) {
    return await this.dao.updateData(cid, cart)
  }

  async cleanCart(cid, cart) {
    return await this.dao.updateData(cid, cart)
  }

  async updateCart(cid, cart) {
    return await this.dao.updateData(cid, cart)
  }

  async updateProduct(cid, pid, cart) {
    return await this.dao.updateData(cid, pid, cart)
  }
}

export default CartsRepository