const request = require('request')

//done destructuring
var forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&units=metric&APPID=dcc25b6c1e783a3c16e3033a85214748'

    request({url: url, json: true}, (error , { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else{
            let code = body.cod
            if(typeof code === 'number'){
                code = code.toString()
            }
            if(code === '200')
            {
                let data = {
                    temperature : body.main.feels_like
                }
                callback(undefined, data)
            }
            else if(code === '400' || code === '404'){
                callback(body.message + " :: Unable get the Forecast", undefined)
            }
        }
    })
}


module.exports = {
    forecast : forecast
}












/*JUST for REFRENCE */



// const url = 'http://api.openweathermap.org/data/2.5/weather?q=Kandana,LK&units=metric&APPID=dcc25b6c1e783a3c16e3033a85214748'
// const _url_lat_lon = 'http://api.openweathermap.org/data/2.5/weather?lat=7.05&lon=79.89&units=metric&APPID=dcc25b6c1e783a3c16e3033a85214748'
// const geoCodingurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?limit=1&access_token=pk.eyJ1IjoicnVrbWFscyIsImEiOiJja2E2YzBicnUwM2NuMnJxczl4dnY4ODVvIn0.FgtwdwVTDqyECLiYgupcbA'
// request({
//     url:_url_lat_lon,
//     json:true
// },(error, response)=>{
//     if(error){
//         console.log(chalk.red.inverse("Unable to connect to weather service!"))
//     }else{
//         let responseCode = response.body.cod
//         if(responseCode === 200){
//             console.log(chalk.blue("It is currently " + response.body.main.feels_like + " degCelcius out there."))
//         }
//         else if(responseCode === "400" || responseCode === "404"){
//             console.log(chalk.red(response.body.message))
//         } 
        
//     }
// })

// //Geocoding

// request({
//     url:geoCodingurl,
//     json:true
// },(error,response)=>{
//     if(error){
//         console.log(chalk.red.inverse("Unable to connect to weather service!"))
//     }else{
//         let data = response.body
//         if(data.features.length === 0){
//             console.log(chalk.red("Unable to find location"))
//         }
//         else{
//             let lat = data.features[0].geometry.coordinates[1]
//             let lon = data.features[0].geometry.coordinates[0]
//             let actualPlace = data.features[0].place_name
//             console.log("Place Name : " + actualPlace + " located @ Lat: "+ lat+ " Lon: "+ lon)
//         }
       
//     }
// })



/* before destructuring */


// if(location === undefined){
//     console.log(chalk.red("No location set"))
//     return    
// }else{
//     geoCode.geoCode(location, (error,data) => {
//         if(error){
//             console.log(chalk.red.inverse(error))
//             return 
//         }
//         forecast.forecast(data.latitude,data.longitude, (error,forecastData)=>{
//             if(error){
//                 console.log(chalk.red.inverse(error))
//                 return 
//             }
//             console.log(chalk.blue(data.location))
//             console.log(chalk.green(forecastData.temperature))
//         })
//     })
// }




// var forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&units=metric&APPID=dcc25b6c1e783a3c16e3033a85214748'

//     request({url: url, json: true}, (error ,response ) => {
//         if(error){
//             callback('Unable to connect to weather service!', undefined)
//         }else{
//             let code = response.body.cod
//             if(typeof code === 'number'){
//                 code = code.toString()
//             }
//             if(code === '200')
//             {
//                 let data = {
//                     temperature : response.body.main.feels_like
//                 }
//                 callback(undefined, data)
//             }
//             else if(code === '400' || code === '404'){
//                 callback(response.body.message + " :: Unable get the Forecast", undefined)
//             }
//         }
//     })
// }