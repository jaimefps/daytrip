const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	username: {
		type: String,
		unique: true,
	},
	password: String
})

userSchema.pre('save', function(next) {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(this.password, salt, null, (err, hash) => {
			if(err) return next(err);
			this.password = hash;
			next();
		})	
	})
})

userSchema.methods.comparePassword = function(password, callback) {
	bcrypt.compare(password, this.password, (err, match) => {
		if(err) return callback(err)

		callback(null, match)
	})
}

 
module.exports = mongoose.model('user', userSchema)
