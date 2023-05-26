import MongoDBContainer from "../dao/mongoDB.dao.js";
import usersModel from "../models/users.model.js";


export default class UserServices {
  constructor() {
    this.dao = new MongoDBContainer(usersModel)
  }

  async userRegisterService(user) {

    return { status: 'success', payload: user }
  }

  async userLoginService(user) {

    return { status: 'success', payload: user }
  }
}
