const {User} = require('../models/user');

let authenticate = (req, res, next)=>{
  let token = req.header('x-auth'); // grab the token from the header
  User.findByToken(token).then((user)=>{ //User.findByToken returns a promise which resolves to a user
    if(!user){ // case no user was found
      Promise.reject(); // reject the promise
    }
    req.user = user; // case the user was found set the user property in the request
                     // onject with the one returned be the Model method
    req.token = token; // set the token property od the request object with the one
                       // returned by the Model method
    next(); // we call next() in order to complete the middleware. If not call,
            // the middleware wouldn't complete; thus the program would crash
  }).catch((e)=>{
    res.status(401).send(e); // case there was a error.
  });
};

module.exports = { authenticate };
