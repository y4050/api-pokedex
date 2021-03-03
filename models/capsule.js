const mongoose = require('mongoose');
// this brings in the Schema class from mongoose for us to build with
const Schema = mongoose.Schema;

// Make a capsuleSchema
const capsuleSchema = new Schema({
    // serial: {type: String, unique: true, required: true}, // for including unique and/or required
    serial: { type: String, unique: true},
    type: String,
    waterLandings: Number
});

// Model
const Capsule = mongoose.model("Capsule", capsuleSchema);

module.exports = Capsule;