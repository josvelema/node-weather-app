console.log('clientside app working');




const form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')


form.addEventListener('submit', (event) => {
  event.preventDefault()

  const location = search.value

  msg1.textContent = 'Loading..'
      msg2.textContent = ''

  fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
  response.json().then((data) => {
    if(data.error) {
      msg1.textContent = 'error! ' + data.error;
      msg2.textContent = ''
      msg3.textContent = ''
    } else {
      msg1.textContent = data.location + ', ' 
      msg3.textContent = data.forecast
      msg2.textContent = data.forecast
      
    }
  })
})

})