const mongoose = require('mongoose');
// this brings in the Schema class from mongoose for us to build with
const Schema = mongoose.Schema;

// Make a pokeSchema
const pokeSchema = new Schema({
    // serial: {type: String, unique: true, required: true}, // for including unique and/or required
    name: { type: String, unique: true},
    url: String
});

// Model
const Pokemon = mongoose.model("Pokemon", pokeSchema);

module.exports = Pokemon;