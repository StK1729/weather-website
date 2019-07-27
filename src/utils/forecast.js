const request = require("request");


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/4d274e8131494d5c11923ac5f9ef0abc/${latitude},${longitude}?units=si`;

    request({
        url,
        json: true
    }, (error,{body}) => {
        if(error){
            callback("Unable to connect to weather service");
        } else if(body.error){
            callback(body.error);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It's currently ${body.currently.temperature} \u2103 out there. There is a ${body.currently.precipProbability}% probability of rain. The lowest temperature today will be ${body.daily.data[0].temperatureMin} \u2103, and the hightest ${body.daily.data[0].temperatureMax} \u2103.`);
        }
    })
}

module.exports = forecast;