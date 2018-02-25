const mongoose = require('mongoose');   //Mongoose Library
const validator = require('validator'); //Library for creating custom validators
const jwt = require('jsonwebtoken');    //JWT Library for generating JSON Web Tokens
const _ = require('lodash');            // Utility functions for JavaScript

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

// Inbuilt Method of Schema class. The return value of this method is used in
// calls to JSON.stringify(document). The idea here is to overwrite this method
// so we send only the _id and email properties back to the client
UserSchema.methods.toJSON = function(){
  let user = this; // refers to the document
  let userObject = user.toObject(); // converts the document into a JavaScript object

  return _.pick(userObject, ['_id', 'email']); // select only the specified properties
}

// This is a custom method that has been added to the Schema before it is compiled
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
}

// ============================  Model  =======================================
const User = mongoose.model('User', UserSchema);

module.exports = { User };
