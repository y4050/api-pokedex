const express = require('express');
const axios = require('axios');

// Set up app
const app = express();
const PORT = process.env.PORT || 8000;

// Database
// need to bring in the entire model folder, and it will look at index
const db = require('./models');
const { Capsule } = require('./models');

// // Run axios *** throw in the fetch route
// axios.get('https://api.spacexdata.com/v4/capsules')
// .then(response => {
//     console.log(response.data);
// });

// Route
app.get('/v1', (req, res) => {
    res.send('Welcome to GA Space X API');
});


app.get('/v1/fetch-capsules', async(req, res) => {
    // Run axios
    const response = await axios.get('https://api.spacexdata.com/v4/capsules')
    // need .json() if using fetch
    const data = response.data; // this will be [] array of objects: [{}, {}, {}]
    // want to add each object info into DB
    for (let i = 0; i < data.legnth; i++) {
        let capsuleObject = data[i]; // object inside the array from data

        // use destructuring
        const { serial, type, water_landings } = capsuleObject;

        // // using await inside a for loop can be buggy, .then is recommended
        // const newCapsule = await db.Capsule.create({
        db.Capsule.create({
            serial: serial,
            type: type,
            waterLandings: water_landings
        }, (err, newCapsule) => {
            console.log(newCapsule);
        });
    }
    res.json(data);
});

// another route to get Data but using map instead of for loop
app.get('/v1/fetch-capsules-map', async (req, res) => {
    // Run axios
    const response = await axios.get('https://api.spacexdata.com/v4/capsules')
    const data = response.data; // this will be [] array of objects: [{}, {}, {}]
    // if don't include index, simply don't have access to it
    const newCapsules = await data.map((capsuleObject) => {     // adding await here because unsure the amount and time needed to process
        const { serial, type, water_landings } = capsuleObject; // destructuring
        const resultObj = {
            serial: serial,
            type: type,
            waterLandings: water_landings
        }
        // this resultObj will be in the newCapsules array
        return resultObj;
    });
    Capsule.collection.drop();
    // Add newCapsules to DB
    const allNewCapsules = await db.Capsule.create(newCapsules);
    // const allCapsules = await db.Capsule.find();     setting the above line in const is similar to this line
    res.json(allNewCapsules);
    // db.Capsule.create(newCapsules, (err, result) => {
    //     console.log(result);
    //     res.json(result);
    // });
});

// A route to display all capsules
app.get('/v1/capsules', async (req, res) => {
    const fetchCapsules = await db.Capsule.find(); // array of objects
    res.json(fetchCapsules);
});

app.get('/v1/capsules/:serial', async (req, res) => {
    // let serial = req.params.serial;
    // destructuring method, do the same as the line above
    const { serial } = req.params;
    const fetchCapsules = await db.Capsule.find({serial: serial});
    res.json(fetchCapsules);
})



// Listening
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
