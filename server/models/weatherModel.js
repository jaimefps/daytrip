const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({ 
  weather: {
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model('weather', weatherSchema);