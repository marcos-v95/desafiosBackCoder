import DaosFactory from "../dao/factory.js"
import config from "../config/dotenv.config.js"


class UserRepository {
  constructor() {
    this.dao = DaosFactory.createUsers(config.DAO)
  }

  async getUser(obj) {
    return await this.dao.getDataByProp(obj)
  }

  async saveUser(user) {
    return await this.dao.saveData(user)
  }
}

export default UserRepository