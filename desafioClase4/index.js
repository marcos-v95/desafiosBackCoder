const productManager=require('./src/manager/productManager.js');

const pathOfData='src/files/data.json'
const manager= new productManager(pathOfData)

const result=async ()=>{
  
  await manager.addProduct({title:'Camisa',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iusto minus vero, magnam iste voluptate',price:2000,thumbnail:'https://rutadeimagen.com/',code:1234,stock:3})
  await manager.addProduct({title:'Remera',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iusto minus vero, magnam iste voluptate',price:3500,thumbnail:'https://rutadeimagen.com/',code:5678,stock:7})
  await manager.getProductById(1)
  // await manager.updateProduct(1,{title:'Chaqueta',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iusto minus vero, magnam iste voluptate',price:3500,thumbnail:'https://rutadeimagen.com/',code:2222,stock:7})
  //await manager.deleteProduct(1)
}
result()