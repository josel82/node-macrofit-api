const mongoose = require('mongoose');

//We are setting mongoose to use promises
mongoose.Promise = global.Promise;

//Database connection
const domainName = 'localhost:27017';
const dbname = 'MacroFitDB';
const uri = process.env.MONGODB_URI || `mongodb://${domainName}/${dbname}`;

mongoose.connect(uri);

module.exports = { mongoose };
