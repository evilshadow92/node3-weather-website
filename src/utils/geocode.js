const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXZpbHNoYWRvdyIsImEiOiJjanZ2a2Jlamw0MzFmM3lxb3M4b3pjYjhlIn0.WKkpiXJutZO3u2OJV7htsA&limit=1'
    
    request({ url, json: true }, (error, {body}) => {
        const features = body.features

        if (error) {
            callback('Unable to connect to location services!')
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else{
            callback(undefined, {
                latitud: features[0].center[0],
                longitud: features[0].center[1],
                location: features[0].place_name
            })
            
        }
    })
}

module.exports = geocode