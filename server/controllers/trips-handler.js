const Trips = require('../models/trips');

exports.getTrips = function (req, res) {
  return Promise.resolve()
    .then(() => {
      if (req.query.id) {
        return Trips.findById(req.query.id)  
      }
      if (req.query.username) {
        return Trips.find({ username: req.query.username })     
      }
      return Trips.find();
    })
    .then(trips => res.status(200).send(trips))
    .catch(e => res.status(422).send({ error: 'Cannot get trips' }));
};

exports.postTrips = function (req, res) {
  new Trips(req.body).save()
    .then(trip => res.status(200).send(trip));
};

exports.updateTrips = function (req, res) {
  const { _id, likesByUsers } = req.body;
  Trips.findByIdAndUpdate(req.body._id, { _id,  likes: likesByUsers.length, likesByUsers  }, (err, data) => {
    if (err) { console.error(err); }
  });
  
  res.send('Rating sent');
};

