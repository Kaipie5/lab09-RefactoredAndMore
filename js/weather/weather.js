'use strict';

function Weather(darkSkyDataResults){
    this.forecast = darkSkyDataResults.summary;
    let date = new Date(darkSkyDataResults.time * 1000)
    this.time = date.toString();
  }

  module.exports = Weather;