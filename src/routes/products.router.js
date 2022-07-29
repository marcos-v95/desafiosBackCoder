import { Router } from "express";

const router= Router();

const products=[{name:"Remera",size:"L",stock:10,id:1},{name:"Pantalon",size:"M",stock:6,id:2}];

// Endpoint que devuelve los productos que contiene el arreglo
router.get('/',(req,res)=>{
  if(products.length===0 || null || undefined){
    res.send({error:'Producto no encontrado'})
  }else{
    res.send(products)
  }
})

// Endpoint que devuelve un producto filtrado por id, le indicamos el id por params
router.get('/:id',(req,res)=>{
  let paramId=req.params.id;
  if(products.length===0 || null || undefined){
    res.send({error:'Producto no encontrado'})
  }else{
    res.send(products[paramId-1])
  }
})
// Endpoint que agrega un producto al array, el mismo metodo se utiliza a traves del formulario html
router.post('/',(req,res)=>{
  let newProduct= req.body
  products.push(newProduct)
  products.map((product,index)=>product.id=index+1)
  // console.log(products)
  res.send(products)
})
// Endpoint que recibe un id por param, filtra el producto del arreglo que coincide con el mismo, y en este caso, actualiza e incrementa el stock cada vez que lo utilicemos
router.put('/:id',(req,res)=>{
  let fillProd=products.find((product)=>product.id==req.params.id)
  fillProd.stock++
  res.send(fillProd)
})
// Endpoint que elimina un producto el arreglo, lo elimina a traves del id enviado por param
router.delete('/:id',(req,res)=>{
  let paramId=parseInt(req.params.id-1)
  products.splice(paramId,1)
  // console.log(products)
  res.send(products)
})
export default router;