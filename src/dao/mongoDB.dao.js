import mongoose from "mongoose";
import config from "../config/dotenv.config.js";
import logger from "../utils/logger.js";

mongoose.connect(config.MONGO_URL, (error) => {
  if (error) {
    logger.info(`Cannot connect to db ${error}`)
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

    } catch (error) {
      logger.info(`Error getting data from database ${error}`)
    }
  }

  async getDataByID(id, pathPopulate) {
    try {
      let populate = pathPopulate || null
      let data = await this.model.findOne({ _id: id }).populate(populate)//Population with mongoose
      return data;

    } catch (error) {
      logger.info(`Error getting data from database ${error}`)
    }
  }

  async getDataByProp(filter) {
    try {
      let data = await this.model.findOne(filter)
      return data

    } catch (error) {
      logger.info(`Error getting data from database ${error}`)
    }
  }

  async saveData(document) {
    try {
      let result = await this.model.create(document)
      return result

    } catch (error) {
      logger.info(`Error creating data in database ${error}`)
    }
  }

  async updateData(id, newDocument) {
    try {
      let result = await this.model.updateOne({ _id: id }, { $set: newDocument })
      return result

    } catch (error) {
      logger.info(`Error updating data in database ${error}`)
    }
  }

  async deleteData(id) {
    try {
      let result = await this.model.deleteOne({ _id: id })
      return result

    } catch (error) {
      logger.info(`Error deleting data in database ${error}`)
    }
  }
}