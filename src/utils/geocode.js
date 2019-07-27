const request = require("request");

const geocode = (city, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=pk.eyJ1Ijoic2sxNzI5IiwiYSI6ImNqeWF6ZWZvcTAzOGMzbW52bzBvcGU3aWgifQ.7e-d46148eShf8qyWi5iCQ&limit=1`;

    request({
        url: geocodeURL,
        json: true
    }, (error, {body})=>{
        if(error){
            callback("Unable to connect to location services");
        } else if(body.features.length===0){
            callback("Search query returned 0 results, try something else");
        } else{
            callback(undefined,{ 
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    })
}

module.exports = geocode
