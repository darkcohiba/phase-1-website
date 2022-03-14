//html variables
const farHeit= document.querySelector('#farenheit')
const sun= document.querySelector('#sun')
const sunriseBTN = document.querySelector('#sunriseBTN')
const sunsetBTN = document.querySelector('#sunsetBTN')
const feel = document.querySelector('#feelsLikeBTN')
const temp = document.querySelector('#temperatureBTN')
const date = document.querySelector('#date')
const title = document.querySelector('h1')
const inputLong = document.querySelector('#longitude')
const inputLat = document.querySelector('#latitude')
const submit = document.querySelector('#newInput')
const alertText = document.querySelector('#alerts')


document.addEventListener('DOMContentLoaded', (e) => {
    submit.addEventListener('click', (e)=>{
        //api variables
        let latitude = document.querySelector('#latitude').value;
        let longitude = document.querySelector('#longitude').value;
        const key = '96179e0143a6a7f7075bec3025df300f'
        const units = 'imperial'
        let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`
        //fetch to pull api data
        fetch(api)
        .then(function(response){
           return response.json()
        })
        .then((data) => {
            renderData(data)
        })
    })
})
//function to interpret data
function renderData(data){
    console.log(data)
    const current = data.current
    const unixSunrise = current.sunrise
    let sunriseDate = new Date(unixSunrise * 1000);
    // Hours part from the timestamp
    let sunriseHours = sunriseDate.getHours();
    // Minutes part from the timestamp
    let sunriseMinutes = "0" + sunriseDate.getMinutes();
    // Seconds part from the timestamp
    let sunriseSeconds = "0" + sunriseDate.getSeconds();
    // Will display time in 10:30:23 format
    let sunrise = sunriseHours + ':' + sunriseMinutes.substr(-2) + ':' + sunriseSeconds.substr(-2);
    const unixSunset = current.sunset
    let sunsetDate = new Date(unixSunset * 1000);
    // Hours part from the timestamp
    let sunsetHours = sunsetDate.getHours();
    // Minutes part from the timestamp
    let sunsetMinutes = "0" + sunsetDate.getMinutes();
    // Seconds part from the timestamp
    let sunsetSeconds = "0" + sunsetDate.getSeconds();
    // Will display time in 10:30:23 format
    let sunset = sunsetHours + ':' + sunsetMinutes.substr(-2) + ':' + sunsetSeconds.substr(-2);
    //populate our title 
    title.textContent = `The current weather in the timezone of ${data.timezone}`

    //populate our temperature card
    farHeit.textContent = `The current temperature is ${current.temp}° farenheit.`
    //buttons to switch temp for feels like temp
    feel.addEventListener('click', (e)=>{
        e.preventDefault();
        farHeit.textContent = `The current temperature feels like ${current.feels_like}° farenheit.`
    })
    temp.addEventListener('click', (e)=>{
        e.preventDefault();
        farHeit.textContent = `The current temperature is ${current.temp}° farenheit.`
    })
    //populate our sun card
    sun.textContent = `Today the sun will rise at ${sunrise}.`
    //buttons to switch our sunrise to sunset
    sunriseBTN.addEventListener('click', (e)=>{
        e.preventDefault();
        sun.textContent = `The sun will rise at ${sunrise}am`
    })
    sunsetBTN.addEventListener('click', (e)=>{
        e.preventDefault();
        sun.textContent = `The sun will set at ${sunset}pm`
    })
    //populate our alerts card
    const alert = data.alerts;
    alertText.textContent = `No Alerts Today`
}

