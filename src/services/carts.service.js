import CartsRepository from "../repositories/cartsRepository.js"
import TicketRepository from "../repositories/ticketsRepository.js"
import config from "../config/dotenv.config.js"


export default class CartServices {
  constructor() {
    this.repository = new CartsRepository();
    this.ticket = new TicketRepository()
  }

  async getCartService(cid) {
    let pathPopulate = config.cartPopulate
    let data = await this.repository.getCart(cid, pathPopulate)

    if (data) {
      return data.products.map((items) => items)
    } else {
      return []
    }
  }

  async createCartService(newCart) {
    let response = await this.repository.createCart(newCart)

    return response
  }

  async addProductinCartService(cid, pid, body) {
    let cart = await this.repository.getCart(cid)
    let quantity = (body.quantity) ? body.quantity : 1
    let pindex = cart.products.findIndex((e) => e.product == pid)

    if (pindex == -1) {
      cart.products.push({ product: pid, quantity: quantity })
      return await this.repository.addProduct(cid, cart)

    } else {
      cart.products[pindex].quantity = cart.products[pindex].quantity + quantity
      return await this.repository.addProduct(cid, cart)
    }
  }

  async deleteProductinCartService(cid, pid) {
    let cart = await this.repository.getCart(cid)
    let pindex = cart.products.findIndex(e => e.product == pid)

    if (pindex > -1) { cart.products.splice(pindex, 1) }

    let result = await this.repository.deleteProduct(cid, cart)
    return result
  }

  async cleanCartService(cid) {
    let cart = await this.repository.getCart(cid)
    cart.products = [];

    let result = await this.repository.cleanCart(cid, cart)
    return result
  }

  async updateCartService(cid, body) {
    let cart = await this.repository.getCart(cid)
    cart.products = body

    let result = await this.repository.updateCart(cid, cart)
    return result
  }

  async updateProductinCartService(cid, pid, body) {
    let cart = await this.repository.getCart(cid)

    let pIndex = cart.products.findIndex(x => x.product._id == pid)
    cart.products[pIndex].quantity = parseInt(body.quantity)

    return await this.repository.updateProduct(cid, cart)
  }

  async checkOutService(cid, user) {
    let pathPopulate = config.cartPopulate
    let cart = await this.repository.getCart(cid, pathPopulate)

    let pReady = cart.products.filter(e => e.quantity <= e.product.stock)
    let pNotReady = cart.products.filter(e => e.quantity > e.product.stock)

    let ticket = {
      amount: pReady.map((e) => e.product.price * e.quantity).reduce((acc, cur) => acc + cur),
      purchaser: user.payload.email
    }
    await this.ticket.createTicket(ticket)

    return pNotReady
  }
}