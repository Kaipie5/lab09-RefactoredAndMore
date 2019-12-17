'use strict';

const superagent = require('superagent');

const client = require('../../js/client');
const Movie = require('./Movie');

function movieHandler(request, response) {
    // const geoData = require('./data/geo.json');
    // const city = request.query.data;
    // console.log(city)    

    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.data.city}`;
    console.log("URL", url)
    

  superagent.get(url)
    .then(results => {
        let movieArray = []
        results.body.results.slice(0, 20).forEach(movie => {
            movieArray.push(new Movie(movie.title, movie.overview, movie.vote_average, movie.vote_count, movie.poster_path, movie.popularity, movie.release_date))
        })
        // console.log("WEATHER OBJ", weatherObjList)


        // console.log("RESPONSE WEATHER", weatherObjList);
        response.send(movieArray);
    })
    .catch(error => console.error(error));
}

module.exports = movieHandler;