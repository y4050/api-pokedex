const express = require('express');
const axios = require('axios');

// Set up app
const app = express();
const PORT = process.env.PORT || 8000;

// Database
// need to bring in the entire model folder, and it will look at index
const db = require('./models');
const { Pokemon } = require('./models');

// Route
app.get('/v1', (req, res) => {
    res.send('Pokedex API');
});


app.get('/v1/fetch-poke-map', async (req, res) => {
    // Run axios
    const response = await axios.get('http://pokeapi.co/api/v2/pokemon/')
    const data = response.data; // this will be [] array of objects: [{}, {}, {}]
    const newPoke = await data.map((pokeObject) => {     // adding await here because unsure the amount and time needed to process
        const { name, url } = pokeObject; // destructuring
        const resultObj = {
            name,
            url
        }
        // this resultObj will be in the newCapsules array
        return resultObj;
    });

    // Capsule.collection.drop();
    // Add newCapsules to DB
    const allNewPokes = await db.Pokemon.create(newPokes);
    // const allCapsules = await db.Capsule.find();     setting the above line in const is similar to this line
    res.json(allNewPokes);
    // db.Capsule.create(newCapsules, (err, result) => {
    //     console.log(result);
    //     res.json(result);
    // });
});

// A route to display all capsules
app.get('/v1/pokes', async (req, res) => {
    const fetchCapsules = await db.Capsule.find(); // array of objects
    res.json(fetchCapsules);
});

app.get('/v1/capsules/:name', async (req, res) => {
    // let serial = req.params.serial;
    // destructuring method, do the same as the line above
    const { name } = req.params;
    const fetchPokes = await db.Pokemon.find({name: name});
    res.json(fetchPokes);
})



// Listening
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
