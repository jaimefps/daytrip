const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function generateToken(user) {
	const timeStamp = new Date().getTime();
	return jwt.encode({ sub: user._id, iat: timeStamp }, config.secret);
}

exports.signin = function(req, res, next) {
	res.send({ token: generateToken(req.user) });
}

exports.signup = function(req, res, next) {
	const {email, username, password} = req.body;
	if(!email || !username || !password) {
		return res.status(422).send({error: 'You must provide email, username and password'});
	}	

	Promise.all([User.findOne({username}), User.findOne({email})]).then((result) => {
		if(result[0]) {
			return res.status(422).send({ error: 'Username is in use' });
		}
		if(result[1]) {
			return res.status(422).send({ error: 'Email is in use' });
		}		
		const user = new User({ email, username, password });
		user.save().then(() => {
			res.status(200).json({ token: generateToken(user) });
		});
	})
}