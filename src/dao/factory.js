import MongoDBContainer from "./mongoDB.dao.js";

import FilesProduct from "./files.dao.js";
import productsModel from '../models/products.model.js';
import cartsModel from '../models/carts.model.js'
import userModel from '../models/users.model.js'
import ticketModel from "../models/ticket.model.js";

class DaosFactory {

  static createProducts(daoKey) {
    const daos = new Map();
    daos.set('files', FilesProduct);
    daos.set('mongo', new MongoDBContainer(productsModel));

    const dao = daos.get(daoKey);

    return dao
  }

  static createCarts(daoKey) {
    const daos = new Map();
    daos.set('files', FilesProduct);
    daos.set('mongo', new MongoDBContainer(cartsModel));

    const dao = daos.get(daoKey)
    return dao
  }

  static createUsers(daoKey) {
    const daos = new Map();
    daos.set('files', FilesProduct);
    daos.set('mongo', new MongoDBContainer(userModel));

    const dao = daos.get(daoKey)
    return dao
  }

  static createTickets(daoKey) {
    const daos = new Map();
    daos.set('files', FilesProduct);
    daos.set('mongo', new MongoDBContainer(ticketModel));

    const dao = daos.get(daoKey)
    return dao
  }
}

export default DaosFactory