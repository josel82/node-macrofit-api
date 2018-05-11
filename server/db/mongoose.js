const mongoose = require('mongoose');
require('../config/config');

//We are setting mongoose to use promises
mongoose.Promise = global.Promise;

//Database connection
const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

module.exports = { mongoose };
