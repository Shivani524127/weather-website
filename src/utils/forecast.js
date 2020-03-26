const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2f26e164580ae3e49f963372e8acbefa/'+latitude+','+longitude+'?units=si'
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect weather API', undefined)
        } else if(body.error) {
            callback('unable to find location, Try another search', undefined)
        } else {
            temparature = body.currently.temperature,
            precipitation =  body.currently.precipProbability,
            summary =  body.daily.data[0].summary
            callback(undefined, 
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })

}

module.exports = forecast