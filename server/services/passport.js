const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret 
};
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	User.findById(payload.sub).then(user => {
		if (user) {
			done(null, user);
		} else {
			done(null, false)
		}
	}, e => done(e, false))
})

const localOptions = { usernameField: 'username' }
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
	User.findOne({username}).then(user => {
		if (!user) return done(null, false);
		user.comparePassword(password, (err, match) => {
			if (err) return done(err);
			if(!match) return done(null, false);

			return done(null, user);
		})
	})
}, e => done(e))

passport.use(jwtLogin)
passport.use(localLogin)