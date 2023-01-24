const fs=require('fs')

class ProductManager{

  constructor(path){
    this.path=path
    this.ID=1
  }

  async getProducts(){
    try {
      if(fs.existsSync(this.path)){
        let data= await fs.promises.readFile(this.path,'utf-8')
        let parseData=JSON.parse(data)
        return parseData
      }else{
        await fs.promises.writeFile(this.path,'[]')
        return []
      }
    }catch (error) {
      console.log(`Cannot read the file: --- ${error} ---`)
    }
  }

  addProduct= async (product)=>{
    try {
      const{title,description,price,thumbnail,code,stock}=product
      let data= await this.getProducts()
      let pCode= data.find((element)=> element.code==code)

      if(pCode){
        return console.log('Error: Product with repeated code')

      }else if(title&&description&&price&&thumbnail&&code&&stock){
        product.id=this.ID++
        data.push(product)
        return await fs.promises.writeFile(this.path,JSON.stringify(data,null,'\t'));

      }else{
        console.log('Error: Missing enter fields')
      }

    }catch (error) {
      console.log(`Cannot write the file: --- ${error} ---`)
    }
  }
  
  async getProductById(id){
    try {
      let data= await this.getProducts()
      let productID=data.find((product)=>product.id==id)

      if(productID){
        console.log(`Congratulations! Product found`)
        console.log (productID)
        return productID

      }else{
        console.log('Error: Product not found')
      }

    } catch (error) {
      console.log(`There is an error: --- ${error} ---`)
    }
  }
  async updateProduct(id,product){
    try {
      let data=await this.getProducts()
      let newProduct=product
      newProduct.id=id
      data[id-1]=newProduct;

      return await fs.promises.writeFile(this.path,JSON.stringify(data,null,'\t'))

    } catch (error) {
      console.log(`There is an error: --- ${error} ---`)
    }
  }
  deleteProduct=async (id)=>{
    try {
      let data= await this.getProducts()
      let indexToDel= data.findIndex(p=>p.id===id)
      data.splice(indexToDel,1)

      return await fs.promises.writeFile(this.path,JSON.stringify(data,null,'\t'))

    } catch (error) {
      console.log(`There is an error: --- ${error} ---`)
    }
  }
}
module.exports=ProductManager;