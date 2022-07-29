let productForm= document.getElementById('productForm')

const handleSubmit= (event,form,route)=>{
  event.preventDefault();
  let formData= new FormData(form);
  let obj={};
  formData.forEach((value,key)=>obj[key]=value)
  // console.log(obj) //Print para ver el objeto creado con los datos ingresados del formulario
  fetch(route,{
    method:"POST",
    body:JSON.stringify(obj),
    headers:{
      "Content-Type":"application/json"
    }
  })
};
productForm.addEventListener('submit',(e)=>handleSubmit(e,e.target,'/products'))