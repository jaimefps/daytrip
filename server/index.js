const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:core/core');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

