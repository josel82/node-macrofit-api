//This file is for managing environment variables

let env = process.env.NODE_ENV || 'development';

//The following lines will only get executed if in development or test mode
if(env === 'development' || env === 'test'){
    let config = require('./config.json'); // requires local configuration file(not in the repository)
    let envConfig = config[env];           

    Object.keys(envConfig).forEach((key)=>{
        process.env[key] = envConfig[key];
    });
}

