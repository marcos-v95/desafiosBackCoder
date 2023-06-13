
import UserRepository from "../repositories/usersRepository.js";

export default class UserServices {
  constructor() {
    this.repository = new UserRepository()
  }

  async getUserService(obj) {
    let result = await this.repository.getUser(obj)
    return result
  }

  async saveUserService(user) {
    let result = await this.repository.saveUser(user)
    return { status: 'success', payload: result }
  }
}
