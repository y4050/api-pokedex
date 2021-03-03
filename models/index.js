const mongoose = require('mongoose');


// // Options (object)
// const config = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }

// Connect to mongoose first then create object schema from here, easier
// specify gaSpaceX as the db name
mongoose.connect('mongodb://localhost/gaSpaceX', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// gives connection to the database
const db = mongoose.connection;

// just like listening in express
db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}: ${db.port}`)
})

db.on('error', (err) => {
    console.log("======> ERROR");
    console.log(err);
});


// // Another way to import the model created
// const Capsule = require('./capsule')
// const allModels = {
//     capsule: Capsule
// }

module.exports = {
    Capsule: require('./capsule')
};