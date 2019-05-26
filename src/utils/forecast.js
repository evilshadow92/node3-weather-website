const request = require('request')

const forecast = (longitud, latitud, callback) => {
    const url = 'https://api.darksky.net/forecast/b11bd9d1037818521971d48b00f3b95a/' + encodeURIComponent(longitud) + ',' + encodeURIComponent(latitud) + '?units=si'

    request({url, json:true}, (error, {body}) => {
        const currently = body.currently
        const daily = body.daily.data[0]

        if(error){
            callback('Unable to connect to weather services!')
        }else if(body.error){
            callback('Unable to find location!')
        }
        else{
            console.log(url)
            callback('',currently.summary + ', It is currently ' + currently.temperature + ' degrees out the high today is ' + daily.temperatureMax + ' and the low is '+ daily.temperatureMin +'. There is a ' + currently.precipProbability + '% chance of rain')  
        }
    })

}

module.exports = forecast



