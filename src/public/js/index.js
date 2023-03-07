// Socket Server
const socket=io()

// Chat Box
let user
let chatBox=document.getElementById('chatBox')

Swal.fire({
  title:'Bienvenido/a',
  input:'text',
  text:'Porfavor, ingrese su email',
  inputValidator:(value)=> !value && 'Necesitas escribir un email para continuar',
  allowOutsideClick:false
}).then( result=> {
  user=result.value
})

chatBox.addEventListener('keyup',event=>{
  if(event.key==='Enter'){
    if(chatBox.value.trim().length>0){
      socket.emit('message',{user:user,message:chatBox.value})
      chatBox.value=''
    }
  }
})

// Socket Listeners
socket.on('messagesLogs', data=>{
  let log=document.getElementById('messagesLogs')
  let messages='';
  data.forEach((msg)=>{
    messages= messages + `usuario: ${msg.user} dice: ${msg.message}</br>`
  })
  log.innerHTML=messages;
})