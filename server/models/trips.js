const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  tripName: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
  },
  locations: Array,
  description: String,
  coordinates: Array,
  names: Array,
  tips: Array,
  images: Array,
  likes: {
    type: Number,
    default: 0,
  },
  likesByUsers: Array
});

module.exports = mongoose.model('trips', tripSchema);
