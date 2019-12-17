'use strict';

const superagent = require('superagent');

const client = require('../../js/client');
const Yelp = require('./Yelp');

function yelpHandler(request, response) {  

    let url = `https://api.yelp.com/v3/businesses/search?latitude=${request.query.data.latitude}&longitude=${request.query.data.longitude}`;
    console.log("URL", url)
    
    //CREDIT TO LAURA ANTONIUS for how to input yelp API key
    superagent.get(`${url}`).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then(results => {
        // console.log(results.body.businesses[0])
        let yelpArray = []
        results.body.businesses.forEach(yelp => {
            yelpArray.push(new Yelp(yelp.name, yelp.image_url, yelp.price, yelp.rating, yelp.url))
        })

        response.send(yelpArray);
    })
    .catch(error => console.error(error));
}

module.exports = yelpHandler;