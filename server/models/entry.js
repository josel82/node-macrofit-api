const mongoose = require('mongoose');

const Entry = mongoose.model('Entry', {
    _userId:{
      type: mongoose.Schema.Types.ObjectId,
      required:true
    },
    title: {
      type: String,
      required: true
    },
    gender: {
      type: Number,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    activityMult: {
      type: Number,
      required: true
    },
    goalMult: {
      type: Number,
      required: true
    },
    isImperial: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type:String
    },
    updatedAt:{
      type:String

    }
});

module.exports = { Entry };
