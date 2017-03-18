const User = require('../models/user');

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
