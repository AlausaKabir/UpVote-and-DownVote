const server = require('./api/routes/index');

const db = require('./config/mongoDB');

const Port = 3000;

db().then(() => { 
    console.log('mongo_db database is connected')
}).catch(err => {
    console.log(err);
});


server.listen(Port, 
() => console.log(`Server running on port ${Port}`));