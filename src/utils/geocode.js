const request = require('request')

const geoCode = (address, callback) => {
    const geoCodingurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoicnVrbWFscyIsImEiOiJja2E2YzBicnUwM2NuMnJxczl4dnY4ODVvIn0.FgtwdwVTDqyECLiYgupcbA'

    request({url: geoCodingurl, json: true},(error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined) //only sending one param but calback fn takes 2 so to pass only 1, set the requred 1 arg and set other undefined
        }
        else{
            if(response.body.features.length === 0){
                callback('Unable to Find the Location.', undefined)
            }
            else{
                const dat = {
                    
                    latitude :  response.body.features[0].geometry.coordinates[1],
                    longitude : response.body.features[0].geometry.coordinates[0],
                    location : response.body.features[0].place_name
                    
                }
                callback(undefined,dat)
               
            }
            
        }
    })
}

module.exports = {
    geoCode : geoCode
}