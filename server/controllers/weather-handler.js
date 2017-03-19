const config = require('../config');
const axios = require ('axios');
const Weather = require('../models/weatherModel')
const ROOT_URL = `http://api.wunderground.com/api/${config.API_KEY}/forecast10day/q/CA/San_Francisco.json`

exports.fetchData = function(req, res) {
  Weather.remove({}).then(() => axios.get(ROOT_URL))
  .then(weather => new Weather({
      weather: weather.data.forecast.simpleforecast.forecastday
    }))
  .then(weather => weather.save()).then(weather => res.send(weather))
}

exports.sendData = function(req,res) {
  Weather.find({}).then(weather => res.status(200).send(weather[0].weather)) 
}
