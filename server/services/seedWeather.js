const axios = require('axios');
const config = require('../../src/config')

axios.patch(`${config.server}/weather`)