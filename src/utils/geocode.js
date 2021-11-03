const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYm9uZGVhc2h3aW4iLCJhIjoiY2t2Y2FiOTJiNGl0MDJwcXd5a2l3ZjZxbSJ9.cHl27yGhWRXF86LJgAbCLQ&limit=1`;

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback(`Unable to connect to Geo Location service`, undefined);
        } else if (response.body.features.length === 0) {
            callback(`Unable to find the location`, undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;