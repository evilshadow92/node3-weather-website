const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherFrom.addEventListener('submit', (event) =>{
    event.preventDefault()
    const location = search.value

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msgOne.textContent = data.error
            } else{
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})