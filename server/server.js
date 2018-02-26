//===============================================================================================
//======================================== LIBRARIES ============================================
//===============================================================================================

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

//===================================  Database connection  =====================================

const {mongoose} = require('./db/mongoose');


//========================================== MODELS =============================================

const {Entry} = require('./models/entry');
const {User} = require('./models/user');


//======================================== VARIABLES ============================================

const port = process.env.PORT || 3000;

const app = express(); //Express App instance

//===============================================================================================
//======================================= MIDDLEWARE ============================================
//===============================================================================================
const {authenticate} = require('./middleware/authenticate');
//CORS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(bodyParser.json()); // it transform the incoming JSON data into a JavaScript Object

//===============================================================================================
//===================================== ENTRIES ROUTES ==========================================
//===============================================================================================

// POST/=========================================================================================
// Saves a new Entry in the database
app.post('/entries', authenticate, (req, res)=>{
  let body = _.pick(req.body, ['title', 'gender', 'age',   // Makes sure the user can only set the selected properties
                                'weight', 'height', 'activityMult',
                                'goal' ,'isImperial']);
  let user = req.user;
  let entry = createEntry(body, user);

  entry.save().then((doc)=>{ // insterts the document in the collection
    res.send(doc); // sends the document back to the client
  },(err)=>{ // case something went wrong with the route
    res.status(400).send();//sends a bad request message
    console.log(err);
  });
});


// GET/=========================================================================================
// Retrieves all entries of an specific user
app.get('/entries', authenticate, (req, res)=>{

  Entry.find({_userId:req.user.id}).then((entries)=>{ //queries the database searching for entries of a specific user
    if(!entries){ // checks if there are entries for this user
      return res.status(404).send(); // case there're no entries sends back a 404 with an empty body
    }
    res.send({entries}); //case there are entries it sends them back to the client
  },(err)=>{ // case there's something wrong with the route
    res.status(400).send(); //sends a bad request message
  });
});

// DELETE/=========================================================================================
// Finds and Removes an entry by ID
app.delete('/entries/:id',(req, res)=>{
  let id = req.params.id; //gets the entry id passed as a parameter
  if(!ObjectID.isValid(id)){ // checks if the id is valid
    return res.status(404).send(); // case the id is not valid it sends a 404 with an empty body
  }
  Entry.findByIdAndRemove(req.params.id).then((result)=>{ //queries the database searching for a specific entry and removes it
    if(!result){ // checks if the entry exists
      return res.status(404).send(); // case the entry couldn't be found it sends back a 404 with an empty body
    }
    res.send({result}); // case the entry was found and deleted, it sends it back to the client
  }, (err)=>{ // case there's something wrong with the route
    res.status(400).send(); //sends a bad request message
  });
});

// PATCH/=========================================================================================
// Finds and Updates an entry by ID
app.patch('/entries/:id', (req, res)=>{
  let id = req.params.id; //gets the entry id passed as a parameter
  let body = _.pick(req.body, ['title', 'gender', 'age',             // Makes sure the user can only update the selected properties
                                'weight', 'height', 'activityMul',
                                'goal' ,'isImperial','updatedAt']);
  if(!ObjectID.isValid(id)){ // checks if the id is valid
    return res.status(404).send(); // case the id is not valid it sends a 404 with an empty body
  }
  body.updatedAt = new Date().getTime(); // sets the updtatedAt property

  Entry.findByIdAndUpdate(id, {$set: body}, {new:true}).then((result)=>{ //Finds and update an Entry by its ID. {new:true} options tell mongoose we want to get the updated document returned

    if(!result){ // checks if a result comes back
      return res.status(404).send(); // case the entry couldn't be updated it sends back a 404 with an empty body
    }
    res.send({result}); // case the entry was found and updated, it sends it back to the client
  }).catch((err)=>{// case there's something wrong with the route
    res.status(400).send(); //sends a bad request message
  });
});

//===============================================================================================
//======================================= USERS ROUTES ==========================================
//===============================================================================================

// POST/=========================================================================================
// USER SIGN UP
app.post('/users', (req, res)=>{
  let body = _.pick(req.body, ['email', 'password']);

  let user = new User(body);

  user.save().then(()=>{
    return user.generateAuthToken(); //call to custom method which generates auth token. returns a promises with the token
  }).then((token)=>{
    res.header('x-auth', token).send(user); // inserts the token in the header and sends it back to the client
  }).catch((err)=>{
    res.status(400).send(err);
  });
});

// POST/=========================================================================================
// USER LOG IN
app.post('/users/login', (req, res)=>{
  let body =_.pick(req.body, ['email', 'password']); //pick only the properties to be used

  User.findByCredentials(body.email, body.password).then((user)=>{ //finds user and verify password
    return user.generateAuthToken().then((token)=>{ //generates token
      res.header('x-auth', token).send(user); //sends response with token
    });
  }).catch((err)=>{
    res.status(400).send(err);
  });
});

// GET/=========================================================================================
// USER AUTHENTICATION  uses "authenticate" custom middeware
app.get('/users/me', authenticate, (req, res)=>{
  res.send(req.user);
});

// DELETE/=======================================================================================
// USER LOG OUT
app.delete('/users/me/token', authenticate, (req, res)=>{

  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  });
});

//===============================================================================================
//========================================== Listener ===========================================
//===============================================================================================
app.listen(port, ()=>{ //"Starts a UNIX socket and listens for connections on the given path"
  console.log('Started on port 3000');
});


//===============================================================================================
//=========================================== Methods ===========================================
//===============================================================================================

// Returns an instance of the Entry model initialized with the data in the request body
let createEntry = (body, user) => {
  let date = new Date().getTime();
  return new Entry({
        _userId: user.id,
        title: body.title,
        gender: body.gender,
        age: body.age,
        weight: body.weight,
        height: body.height,
        activityMult: body.activityMult,
        goal: body.goal,
        isImperial: body.isImperial,
        createdAt: date,
        updatedAt: date
  });
};
