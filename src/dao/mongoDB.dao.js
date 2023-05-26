import mongoose from "mongoose";
import config from "../config/dotenv.config.js";

mongoose.connect(config.MONGO_URL, (error) => {
  if (error) {
    console.log('Cannot connect to db')
    process.exit()
  }
})

export default class MongoDBContainer {
  constructor(model) {
    this.model = model
  }

  async getData(query, options) {
    try {
      let result = await this.model.paginate(query, options)
      return result

    } catch (error) { console.log(error) }
  }

  async getDataByID(id) {
    try {
      let result = await this.model.findOne({ _id: id }).populate('products.product')//Population with mongoose
      return result;

    } catch (error) { console.log(error) }
  }
  async saveData(document) {
    try {
      let result = await this.model.create(document)
      return result

    } catch (error) { console.log(error) }
  }
  async updateData(id, newDocument) {
    try {
      let result = await this.model.updateOne({ _id: id }, { $set: newDocument })
      return result

    } catch (error) { console.log(error) }
  }
  async deleteData(id) {
    try {
      let result = await this.model.deleteOne({ _id: id })
      return result

    } catch (error) { console.log(error) }
  }
}