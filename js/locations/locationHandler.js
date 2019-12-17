'use strict';

const superagent = require('superagent');

const client = require('../../js/client');
const Location = require('./Location');

let currentCity;
let currentLat;
let currentLng; 

function locationHandler(request, response) {
    // const geoData = require('./data/geo.json');
    const city = request.query.data;
    // console.log(city)

    let locationObj;

    let sql = 'SELECT * FROM city_explorer WHERE city_name=$1;';
    let safeValues = [city];

    client.query(sql, safeValues)
    .then(results => {
        if (results.rowCount > 0) {
            let row = results.rows[0]
            locationObj = new Location(row.city_name, row.formatted_query, row.latitude, row.longitude);
        } else {
            locationObj = ""
        }

        if (locationObj != "") {
            console.log(locationObj)
            currentLat = locationObj.latitude
            currentLng = locationObj.longitude
            currentCity = city
            response.send(locationObj)
        } else {
            let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`;
            console.log(url)
            superagent.get(url)
                .then(results => {
                    // console.log(results.body.results[0])
                    let result = results.body.results[0];

                    let locationObj = new Location(city, result.formatted_address, result.geometry.location.lat, result.geometry.location.lng);
                    // console.log(locationObj)
                    currentLat = locationObj.latitude
                    currentLng = locationObj.longitude
                    currentCity = city
                    
                    insertLocation(locationObj)
                    // console.log("RESPONSE LOCATION", locationObj);
                    response.send(locationObj);
                    
            })
            .catch(error => console.error(error));
        } 
    })
    
}

function insertLocation(location) {

    console.log(location)
    let sql = 'INSERT INTO city_explorer (city_name, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);';
    let safeValues = [location.search_query, location.formatted_query, location.latitude, location.longitude];

    client.query(sql, safeValues)

}
module.exports = locationHandler;

