import mongoose from "mongoose";

mongoose.connect('mongodb+srv://marcos95:ecommerce1234@ecommerce.llqcwcl.mongodb.net/?retryWrites=true&w=majority', error => {
    if(error){
      console.log('Cannot connect to db')
      process.exit()
    }
})

export default class MongoDBContainer{
  constructor(collection,schema){
    this.model= mongoose.model(collection,schema)
    this.numberID=1
  }

  async getData (){
    try {
      let result= await this.model.find()
      return result;

    } catch (error) {console.log(error)}
  }
  async getDataByID (idd){
    try {
      let result= await this.model.find({id:idd})
      return result;

    } catch (error) {console.log(error)}
  }
  async saveData (document){
    try {
      document.id=this.numberID++;
      let result= await this.model.create(document)
      return result

    } catch (error) {console.log(error)}
  }
  async updateData (id, newDocument){
    try {
      let result= await this.model.updateOne({id:id},{$set:newDocument})
      return result

    } catch (error) {console.log(error)}
  }
  async deleteData (id){
    try {
      let result=await this.model.deleteOne({id:id})
      return result

    } catch (error) {console.log(error)}
  }
}