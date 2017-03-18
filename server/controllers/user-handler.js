const User = require('../models/user');
const Trips = require('../models/trips');

exports.getUserInfo = function (req, res) {
  const { username } = req.query;
  User.findOne({username})
    .then(user => res.status(200).send({
      favorites: user.favorites,
      friends: user.friends,
      trips: user.trips,
    }))
    .catch(e => res.status(422).send({ error: 'cannot get user' }));
};


exports.putUserInfo = function (req, res) {
  const { username, _id, del } = req.body;
  User.findOne({username}).then(user => {
    if (del) {
      user.favorites.splice(user.favorites.indexOf(_id), 1)
      return user.save().then(trip => res.status(200).send(trip)); 
    }

    Trips.findById(_id).then(trip => {
      //prob a check to see if it exists already 
      user.favorites.push(trip._id);
      user.save().then(trip => res.status(200).send(trip)); 
    })
  })
};