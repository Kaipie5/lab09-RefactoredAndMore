'use strict';

const superagent = require('superagent');

const client = require('../../js/client');
const Weather = require('./weather');

function weatherHandler(request, response) {
    // const weatherData = require('./data/darksky.json');
    let url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${request.query.data.latitude},${request.query.data.longitude}`;
    console.log(url)

  superagent.get(url)
    .then(results => {

        let weatherObjList = results.body.daily.data.map( (dayForecast) => {
            return new Weather(dayForecast)
        });

        // console.log("WEATHER OBJ", weatherObjList)


        // console.log("RESPONSE WEATHER", weatherObjList);
        response.send(weatherObjList);
        
    })
    .catch(error => console.error(error));

}

module.exports = weatherHandler;