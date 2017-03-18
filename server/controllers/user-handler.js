const User = require('../models/user');

exports.getUserInfo = function (req, res) {
  console.log('getUserInfo in user-handler: ', req.query);
  const user = req.query;
  User.find(user)
    .then(user => res.status(200).send({
      favorites: user.favorites,
      friends: user.friends,
      trips: user.trips,
    }))
    .catch(e => res.status(422).send({ error: 'cannot get user' }));
};
