const socket= io() 

let form=document.getElementById('form')

const handleSubmit=(event,form)=>{
  event.preventDefault()
  let formData= new FormData(form)
  let obj={};
  formData.forEach((value,key)=>obj[key]=value)

  fetch('/api/products',{
    method:"POST",
    body:JSON.stringify(obj),
    headers:{
      "Content-Type":"application/json"
    }
  })
  
  
}
form.addEventListener('submit',(e)=>handleSubmit(e,e.target)) 
socket.on('product',(data)=>{
  
  let prod=document.getElementById('prodsAdded')
  let card=new String()
  data.forEach((p) =>{
    card=`${card}
      <div style="display: flex;justify-content:space-evenly">
        <p>Producto agregado: ${p.title}</p>
        <p>Precio de producto: ${p.price}</p>
        <p>Cantidad agregada: ${p.stock}</p>
      </div>`
  })
  prod.innerHTML=card
})