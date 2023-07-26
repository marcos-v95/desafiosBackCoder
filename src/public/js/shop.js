const form = document.getElementById('shopForm')

form.addEventListener('submit', (evt) => {
  evt.preventDefault()
  let data = new FormData(form)
  let obj = {}
  data.forEach((value, key) => obj[key] = value)
  console.log(evt)
  console.log(obj)
  fetch("api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json"
    }
  })
})
const addToCart = (asd) => {
  console.log(asd)
}