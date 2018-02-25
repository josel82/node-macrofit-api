const mongoose = require('mongoose');   //Mongoose Library
const validator = require('validator'); //Library for creating custom validators
const jwt = require('jsonwebtoken');    //JWT Library for generating JSON Web Tokens
const _ = require('lodash');            // Utility functions for JavaScript
const bcrypt = require('bcryptjs');

// ============================  Schema  =======================================
//Firt we define our user schema. This define the shape of the documents stored
//in the Users collection
const UserSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        minlength:1,
        trim: true,
        unique: true,
        validate: { //Custom Validator
          validator : validator.isEmail, // checks if the email provided is valid
          message: '{VALUE} is not a valid email!'
        }
      },
      password:{
        type: String,
        required: true,
        minlength:6,
      },
      tokens:[{
        access:{
          type: String,
          required: true
        },
        token:{
          type: String,
          required: true
        }
      }]
    });

// ================================  Mongoose Middleware  ====================================
// These will run at a specified moment in the Document's life. And will be triggerd by a given event

UserSchema.pre('save', function(next){ //these middleware will run before the document is saved in the database
  let user = this; //refers to the document

  if(user.isModified('password')){ //check if the password has been modified

    let hashed = bcrypt.genSalt(10, (err, salt)=>{ //generates salt
      bcrypt.hash(user.password, salt, (err, hash)=>{ // hashes the paswword
        user.password = hash; // set the password property with the hash value
        next(); // completes the middleware;
      });
    });
  }else{
    next(); // completes the middleware;
  }
});



// ===============================  Instance Methods  ========================================
// Methods inside the method object are instance methods. Therefore we can access
// this methods via intances of this model. Instance methods get called by individual
// documents

// to JSON is and Inbuilt Instance Method whose return value is used in
// calls to JSON.stringify(document). The idea here is to overwrite this method
// so we send only the _id and email properties back to the client
UserSchema.methods.toJSON = function(){
  let user = this; // refers to the document
  let userObject = user.toObject(); // converts the document into a JavaScript object

  return _.pick(userObject, ['_id', 'email']); // select only the specified properties
};

// This is a instance method that has been added to the Schema before it is compiled
// into the model. The idea here is to add the functionality for generating JSON
// Web Tokens.
UserSchema.methods.generateAuthToken = function(){
  let user = this; // refers to the document
  let access = 'auth'; // specifies the type of token
  let token = jwt.sign({ _id : user._id.toHexString(), access}, 'abc123').toString(); //hashing function

  user.tokens = user.tokens.concat([{access, token}]); //pushes the token to the tokens array declared in the schema

  return user.save().then(()=>{ // saves these configurations and returns a promise with the generated token
    return token;
  })//
};

// ==================================  Model Methods  =======================================
// Model methods get called by the models

UserSchema.statics.findByToken = function(token){
  let User = this; //Refers to the Model
  let decoded; //declares variable

  try{
    decoded = jwt.verify(token, 'abc123'); //verifies the token. case is valid it sets the variable "decoded" with this value
  }catch(e){
    return Promise.reject(); // throws error in case the token is invalid
  }
  return User.findOne({ // returns a promise which finds the authenticated user.
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

};

// ============================  Model  =======================================
const User = mongoose.model('User', UserSchema);

module.exports = { User };
