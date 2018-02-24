const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username:{
    type: String,
    required: true,
    minlength:1,
    trim: true
  },
  firstname: {
    type: String,
    required: true,
    minlength:1,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    minlength:1,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength:1,
    trim: true
  },
  password:{
    type: String,
    required: true,
    minlength:1,
    trim: true
  }
});

module.exports = { User };
