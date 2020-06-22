var request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFodWwyNTMiLCJhIjoiY2tibnV1aXBhMXduMTJ0cGpveTJnMjBsMSJ9.6kGbpr-LFNwZI1uhVTpUdA';
    request({ url : url, json : true }, (error, {body}) => {
        if(error) {
                    callback("error while connecting to geocode API");
                }
                else if(body.features.length == 0) {
                    callback("Enter valid address");
                }
                else {
                    //when we get the actual resp
                    callback(undefined, {
                        latitude : body.features[0].center[1],
                        longitude : body.features[0].center[0],
                        location : body.features[0].place_name
                    });
                }
    });

}

module.exports = geocode;