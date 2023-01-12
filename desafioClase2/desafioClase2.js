class ProductManager{
  constructor(){
    this.products=[]
  }
  addProduct=(product)=>{
    const {title,description,price,thumbnail,code,stock}=product
    let dataCodes=this.products.map((product)=>product.code)
  
    if(code==dataCodes){
      console.log('Error: Product with repeated code')

    }else if(title&&description&&price&&thumbnail&&code&&stock){
      product.id=this.products.length+1
      this.products.push(product)

      console.log(`Congratulations! Product added successfully!`)
    }else{
      console.log('Error: Missing enter fields')
    }
  }
  getProducts(){
    return this.products
  }
  getProductById(id){
    let productById=this.products.find((product)=>product.id===id)

    if(productById){
      console.log('Congratulations!: Product found')
      return productById

    }else{
      console.log('Error: Product not found')
    }
  }
}

const manager=new ProductManager

manager.addProduct({title:'Camisa',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iusto minus vero, magnam iste voluptate',price:2000,thumbnail:'https://rutadeimagen.com/',code:1234,stock:3})

manager.addProduct({title:'Remera',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iusto minus vero, magnam iste voluptate',price:3500,thumbnail:'https://rutadeimagen.com/',code:1234,stock:7})

manager.getProducts()

manager.getProductById(1)