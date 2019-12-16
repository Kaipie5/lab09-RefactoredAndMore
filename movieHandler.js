function createResponseObjMovies(request, response) {
    // const geoData = require('./data/geo.json');
    // const city = request.query.data;
    // console.log(city)    

    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`;
    console.log("URL", url)
    

  superagent.get(url)
    .then(results => {
        console.log(results.body.results[0])
        let movieArray = []
        results.body.results.forEach(movie => {
            movieArray.push(new Movie(movie.title, movie.overview, movie.vote_average, movie.vote_count, movie.poster_path, movie.popularity, movie.release_date))
        })
        // console.log("WEATHER OBJ", weatherObjList)


        // console.log("RESPONSE WEATHER", weatherObjList);
        response.send(movieArray);
        
    
    });
}