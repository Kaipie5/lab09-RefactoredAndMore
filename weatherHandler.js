function createResponseObjWeather(request, response) {
    // const weatherData = require('./data/darksky.json');
    console.log("LAT LNG", currentLat, currentLng)
    let url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${currentLat},${currentLng}`;

  superagent.get(url)
    .then(results => {

        let weatherObjList = results.body.daily.data.map( (dayForecast) => {
            return new Weather(dayForecast)
        });

        // console.log("WEATHER OBJ", weatherObjList)


        // console.log("RESPONSE WEATHER", weatherObjList);
        response.send(weatherObjList);
        
    });

}