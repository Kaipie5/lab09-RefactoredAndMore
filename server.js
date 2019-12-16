'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const pg = require('pg')

// const databaseURL = 'postgres://localhost:5432/city_explorer';
// console.log(databaseURL)







const app = express();
app.use(cors());

// allows us to get real data
const superagent = require('superagent');

const PORT = process.env.PORT;

let currentLat = 0;
let currentLng = 0;
let currentCity = "";

app.get('/', (request, response) => {
    console.log("HELLLOOOOOOOO")
    response.send("Hello from the back side");
})

app.get('/location', (request, response) => {
    console.log(" ALSO HELLOOOOOO")
    try{  
        createResponseObjLocation(request, response);      
    }
    catch(error){
        console.error(error); // will turn the error message red if the environment supports it
        response.status(500).send('Sorry something went wrong');
    }
})

app.get('/weather', (request, response) => {
    console.log(" Weather HELLOOOOOO")
    try{  
        createResponseObjWeather(request, response);      
    }
    catch(error){
        console.error(error); // will turn the error message red if the environment supports it
        response.status(500).send('Sorry something went wrong');
    }
})

app.get('/events', (request, response) => {
    console.log("Event HELLOOOOO")
    try{  
        createResponseObjEvent(request, response);      
    }
    catch(error){
        console.error(error); // will turn the error message red if the environment supports it
        response.status(500).send('Sorry something went wrong');
    }  
})

app.get('/movies', (request, response) => {
    console.log("Movies HELLOOOOO")
    try{  
        createResponseObjMovies(request, response);      
    }
    catch(error){
        console.error(error); // will turn the error message red if the environment supports it
        response.status(500).send('Sorry something went wrong');
    }  
})

app.get('/yelp', (request, response) => {
    console.log("Yelp HELLOOOOO")
    try{  
        createResponseObjYelp(request, response);      
    }
    catch(error){
        console.error(error); // will turn the error message red if the environment supports it
        response.status(500).send('Sorry something went wrong');
    }  
})

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
})
  .catch((err) => console.error(err));

  
