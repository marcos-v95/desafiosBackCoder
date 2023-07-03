import UserRepository from "../repositories/usersRepository.js";
import jwt from "jsonwebtoken";
import { sendMailHandler } from '../utils/mail.js'

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

  async recoveryPasswordService(email) {

    let user = await this.repository.getUser({ email: email })
    const token = jwt.sign({ userID: user._id, userName: user.email }, 'recoverySecret', { expiresIn: "1h" })
    user.resetPassword = token

    const mailContent = {
      from: 'Marcos <marcoos.av95@gmail.com>',
      to: email,
      subject: 'Cambio de contraseña',
      html: `
        <div>
          <h1> Este es el link para cambiar el password: http://localhost:8080/api/sessions/resetPassword/${token}</h1>
        </div>
        `,
      //   attachments: [{ 
      //     filename: 'example.jpg',
      //     path: 'example.jpg',
      //     cid: 'exampleName'
      //   }] 
    }

    sendMailHandler(mailContent)
    await this.repository.updateUser(user._id, user)

    return token
  }

  async resetPassword(token, password) {
    let { createHash, isValidPassword } = await import('../utils/utils.js')

    let user = await this.repository.getUser({ resetPassword: token })
    if (!user) { return { status: 'error', message: 'user not found' } }

    jwt.verify(user.resetPassword, 'recoverySecret')

    if (isValidPassword(user, password)) return { status: 'error', message: 'password same as previous' }
    user.password = createHash(password)

    await this.repository.updateUser(user._id, user)
    return { status: 'success', message: 'password changed' }
  }

  async changeRole(id) {
    let user = await this.repository.getUser({ _id: id })

    if (user.role == 'user') {
      user.role = 'premium'
      await this.repository.updateUser(id, user)
    } else {
      user.role = 'user'
      await this.repository.updateUser(id, user)
    }
    return { status: 'success', message: 'role changed' }
  }
}
