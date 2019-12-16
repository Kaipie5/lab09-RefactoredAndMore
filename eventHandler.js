function createResponseObjEvent(request, response) {
    // const geoData = require('./data/geo.json');
    // const city = request.query.data;
    // console.log(city)

    let url = `http://api.eventful.com/rest/events/search?app_key=${process.env.EVENTFUL_API_KEY}&location=${currentCity}&date=Future`;
    console.log("URL", url)
    const jsdom = require("jsdom");
    

  superagent.get(url)
    .then(results => {
        // console.log(Object.keys(results));
        const dom = new jsdom.JSDOM(results.text)
        let eventsArray = []
        let numEvents = 20
        if (dom.window.document.querySelectorAll("event").length < 20) {
            numEvents = dom.window.document.querySelectorAll("event").length
        }

        let allEvents = dom.window.document.querySelectorAll("event")
        
        for (let i = 0; i < numEvents; i++) {
            let event = allEvents[i]
            // console.log(event.querySelector('url').textContent)
            let link = event.querySelector("url").textContent;
            let event_date = event.querySelector("start_time").textContent;
            let name = event.querySelector("title").textContent;
            let summary = event.querySelector("description").textContent;
            let newEvent = new Event(link, name, event_date, summary);
            // console.log(newEvent)
            eventsArray.push(newEvent)
        }
        // console.log(eventsArray)
        response.send(eventsArray);
        
    
    });
}