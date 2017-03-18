const User = require('../models/user');
const Trips = require('../models/trips');

exports.getUserInfo = function (req, res) {
  const user = req.query;
  User.find(user)
    .then(user => res.status(200).send({
      favorites: user[0].favorites,
      friends: user[0].friends,
      trips: user[0].trips,
    }))
    .catch(e => res.status(422).send({ error: 'cannot get user' }));
};


exports.putUserInfo = function (req, res) {
  const { username, _id } = req.body;
  User.findOne({username}).then(user => {
    Trips.findById(_id).then(trip => {
      //prob a check to see if it exists already 
      user.favorites.push(trip);
      user.save().then(trip => res.status(200).send(user)); 
    })
  })
};