const request = require("request");


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/4d274e8131494d5c11923ac5f9ef0abc/${latitude},${longitude}?units=si&si=temperature`;

    request({
        url,
        json: true
    }, (error,{body}) => {
        if(error){
            callback("Unable to connect to weather service");
        } else if(body.error){
            callback(body.error);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It's currently ${body.currently.temperature} degrees out there. There is a ${body.currently.precipProbability}% probability of rain.`);
        }
    })
}

module.exports = forecast;