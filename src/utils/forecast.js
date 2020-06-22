var request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c74bff3778b4fc06faafe748aa43af1c&query=' + latitude + ',' + longitude + '&units=f';
    request({ url : url, json : true }, (error, {body}) => {
        if(error) {
            callback("error while connecting to weather API");
        }
        else if(body.error) {
            callback("Unable to fetch weather for given location");
        }
        else {
            //when we get the actual resp
            callback(undefined, {
                weatherInfo : body.location.name + ',' + body.location.country + ' : temperature is ' + body.current.temperature + ' and weather is ' + body.current.weather_descriptions,
                weatherIcon : body.current.weather_icons[0]
            });
        }
    });

}

module.exports = forecast;