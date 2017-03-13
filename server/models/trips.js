const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  locations: String,
  coordinates: String,
  names: String,
  likes: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('trips', tripSchema);