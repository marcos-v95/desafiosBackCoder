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
    // this.numberID=1
  }

  async getData (limit,page,sort,category,status){
    let limitperPage= limit || 10;
    let pages= page || 1;
    let query= (category||status) ? {$or:[{category:category},{status:status}]} : {} // Op ternary
    
    try {
      let result= await this.model.paginate(query, {limit:limitperPage, page:pages, sort:{price:sort},lean:true})// lean prevents the "document hydration", sends to handlebars the document as a plain object
      result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}` :'';//link for views router
      result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}` :'';//link for views router
      result.isValid= !(page<=0||page>result.totalPages) //validate for views router
      
      return {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        currentPage: result.page,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.prevLink,
        nextLink: result.nextLink,
        isValid:result.isValid //only for views router
      }
    } catch (error) {console.log(error)}
  }
  async getDataByID (id){
    try {
      let result= await this.model.findOne({_id:id}).populate('products.product')//Population with mongoose
      return result;
    
    } catch (error) {console.log(error)}
  }
  async saveData (document){
    try {
      // document.id=this.numberID++;
      let result= await this.model.create(document)
      return result

    } catch (error) {console.log(error)}
  }
  async updateData (id, newDocument){
    try {
      let result= await this.model.updateOne({_id:id},{$set:newDocument})
      return result

    } catch (error) {console.log(error)}
  }
  async deleteData (id){
    try {
      let result=await this.model.deleteOne({_id:id})
      return result

    } catch (error) {console.log(error)}
  }
}