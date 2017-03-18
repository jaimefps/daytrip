const axios = require('axios')

exports.fetchData = function(req, res) {
  const {query} = req.body
  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyAYVAslO99OwvCeZmCZG37ZOaUZ0p9DIUg`)
  .then(results => {res.send(results.data)})
}
