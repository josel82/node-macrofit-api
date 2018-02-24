// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//Database connection
const {mongoose} = require('./db/mongoose');

//Models
const {Entry} = require('./models/entry');
const {User} = require('./models/user');

const port = process.env.PORT || 3000;
//Express app instance
const app = express();

//Middlewares
//CORS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(bodyParser.json());


//Routes

//Saves a new Entry in the database
app.post('/entries',(req, res)=>{
  let entry = new Entry({
        userId: req.body.userId,
        title: req.body.title,
        gender: req.body.gender,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
        activityMult: req.body.activityMult,
        goal: req.body.goal,
        isImperial: req.body.isImperial
  })
  entry.save().then((doc)=>{
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  });
});

// Retrieves all entries of an specific user
app.get('/entries/:userId',(req, res)=>{
  if(!ObjectID.isValid(req.params.userId)){
    return res.status(400).send('Invalid User ID.');
  }

  Entry.find({userId:req.params.userId}).then((entries)=>{
    res.send({entries});
  },(err)=>{
    res.status(404).send(err);
  })
});



app.listen(port, ()=>{
  console.log('Started on port 3000');
})
