const User = require('../models/user');
const Trips = require('../models/trips');

exports.getUserInfo = function (req, res) {
  const { username } = req.query;
  User.findOne({ username })
    .then(user => res.status(200).send({
      favorites: user.favorites,
      friends: user.friends,
      trips: user.trips,
    }))
    .catch(e => res.status(422).send({ error: 'cannot get user' }));
};


exports.updateUserInfo = function (req, res) {
  const { username, _id, del } = req.body;
  User.findOne({ username }).then((user) => {
    if (del) {
      user.favorites.splice(user.favorites.indexOf(_id), 1);
      return user.save().then(trip => res.status(200).send(trip));
    }
    Trips.findById(_id).then((trip) => {
      user.favorites.push(trip._id);
      user.save().then(trip => res.status(200).send(trip));
    });
  });
};

exports.updateUserFriends = function (req, res) {
  const { username, friend, del } = req.body;
  User.findOne({ username }).then((user) => {
    if (del) {
      user.friends.splice(user.friends.indexOf(friend), 1);
      return user.save().then(user => res.status(200).send(user));
    }
    User.findOne({ username: friend }).then((friendUser) => {
      user.friends.push(friendUser.username);
      user.save().then(user => res.status(200).send(user));
    });
  });
};
