import MongoDBContainer from "../dao/mongoDB.dao.js"
import cartsModel from "../models/carts.model.js"


export default class CartServices {
  constructor() {
    this.dao = new MongoDBContainer(cartsModel)
  }

  async getCartService(cid) {
    let data = await this.dao.getDataByID(cid)

    if (data) {
      return data.products.map((items) => items)
    } else {
      return []
    }
  }

  async createCartService(newCart) {
    let response = await this.dao.saveData(newCart)

    return response
  }

  async addProductinCartService(cid, pid) {
    let cart = await this.dao.getDataByID(cid)
    let exist = cart.products.findIndex((e) => e.product == pid)

    if (exist == -1) {
      cart.products.push({ product: pid, quantity: 1 })
      let result = await this.dao.updateData(cid, cart)

      return result
    } else {
      cart.products[exist].quantity++
      let result = await this.dao.updateData(cid, cart)

      return result
    }
  }

  async deleteProductinCartService(cid, pid) {
    let cart = await this.dao.getDataByID(cid)
    let prodtoDelete = cart.products.findIndex(e => e.id == pid)
    cart.products.splice(prodtoDelete, 1)

    let result = await this.dao.updateData(cid, cart)
    return result
  }

  async cleanCartService(cid) {
    let cart = await this.dao.getDataByID(cid)
    cart.products = [];

    let result = await this.dao.updateData(cid, cart)
    return result
  }

  async updateCartService(cid, body) {
    let cart = await this.dao.getDataByID(cid)
    cart.products = body

    let result = await this.dao.updateData(cid, cart)
    return result
  }

  async updateProductinCartService(cid, pid, body) {
    let cart = await this.dao.getDataByID(cid)
    let pIndex = cart.products.findIndex(x => x.product._id == pid)

    cart.products[pIndex].quantity = parseInt(body.quantity)

    let result = await this.dao.updateData(cid, cart)
    return result
  }
}