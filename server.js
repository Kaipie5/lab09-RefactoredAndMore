'use strict';

require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');


app.use(cors());

const client = require('./js/client');
const locationHandler = require('./js/locations/locationHandler');
const weatherHandler = require('./js/weather/weatherHandler');
const eventHandler = require('./js/events/eventHandler');
const movieHandler = require('./js/movies/movieHandler');
const yelpHandler = require('./js/yelp/yelpHandler');


const PORT = process.env.PORT || 3002;
// const databaseURL = 'postgres://localhost:5432/city_explorer';
// console.log(databaseURL)

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  })
  .catch((err) => console.error(err));

app.get('/', (request, response) => {
    console.log("HELLLOOOOOOOO")
    response.send("Hello from the back side");
});

app.get('/location', locationHandler);

app.get('/weather', weatherHandler);

app.get('/events', eventHandler);

app.get('/movies', movieHandler);

app.get('/yelp', yelpHandler);

app.get('*', (request, response) => {
    response.status(404);
});



  
