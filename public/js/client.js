
console.log('Client side JS')  

// fetch('http://puzzle.mead.io/puzzle'
// ).then((response) => {
//     return response.json()
// }).then(data => {
//     console.log(data)
// })

const weatherform = document.querySelector('#weatherform')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location) 
    fetch(url, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = "Temprature : " + data.forecast.temperature
        }
})
})


