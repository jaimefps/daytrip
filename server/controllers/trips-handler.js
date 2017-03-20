const Trips = require('../models/trips');

exports.getTrips = function (req, res) {
  if (req.query.id) {
    return Trips.findById(req.query.id)
      .then(trip => res.status(200).send(trip))
      .catch(e => res.status(422).send({ error: 'Cannot get trip' }));
  }
  if (req.query.username) {
    return Trips.find({ username: req.query.username })
      .then(trips => res.send(trips))
      .catch(e => res.status(422).send({ error: 'Cannot get trips' }));
  }
  Trips.find()
    .then(trips => res.status(200).send(trips))
    .catch(e => res.status(422).send({ error: 'Cannot get trips' }));
};

exports.postTrips = function (req, res) {
  const { tripName, username, locations, description, names, tips, images, coordinates } = req.body;
  const trip = new Trips({ tripName, username, locations, description, names, tips, images, coordinates });
  trip.save().then(trip => res.status(200).send(trip));
};

exports.updateTrips = function (req, res) {
  const {_id, likes, likesByUsers} = req.body
  Trips.findByIdAndUpdate(req.body._id, { _id, likes, likesByUsers }, (err, data) => {
    if (err) { console.error(err); }
  });
  res.send('Rating sent');
};

