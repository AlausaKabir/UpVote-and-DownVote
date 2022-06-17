const mongoose = require('mongoose');
const {TEST_DB, DATA_DB} = require('./keys');


const mongoConnection = () => { 
    if (process.env.NODE_ENV === 'development') { 
        mongoUrl = DATA_DB
    } else {
        mongoUrl = TEST_DB || 'mongo://localholst/testing';

    }
    return mongoose.connect(mongoUrl);
}


module.exports = mongoConnection