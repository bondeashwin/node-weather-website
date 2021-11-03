const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1a377155bb518b55dc25a5686b5cda60&query=${latitude},${longitude}&units=f`;

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback(`Unable to connect to weather service`, undefined);
        } else if (response.body.error) {
            callback(`Unable to find location`, undefined)
        } else {
            const data = response.body.current;
            callback(undefined, {
                description: data.weather_descriptions[0],
                temperature: data.temperature,
                feelsLikeTemperature: data.feelslike
            });
        }
    });
};

module.exports = forecast;