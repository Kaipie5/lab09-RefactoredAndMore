function createResponseObjYelp(request, response) {  

    let url = `https://api.yelp.com/v3/businesses/search?term=food&latitude=37.786882&longitude=-122.399972`;
    console.log("URL", url)
    

  superagent.get(url)
    .then(results => {
        console.log(results.body.results[0])
        let yelpArray = []
        results.body.results.forEach(yelp => {
            yelpArray.push(new Yelp(yelp.title, yelp.overview, yelp.vote_average, yelp.vote_count, yelp.poster_path, yelp.popularity, yelp.release_date))
        })
        // console.log("WEATHER OBJ", weatherObjList)


        // console.log("RESPONSE WEATHER", weatherObjList);
        response.send(yelpArray);
    });
}