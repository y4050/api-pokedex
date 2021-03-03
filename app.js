// Imports
require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const cors = require('cors')

// App Set up
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests

// API Routes
app.get('/v1/', (req, res) => {
  res.json({ name: 'API Set Up', greeting: 'Welcome to the our API', author: 'Rome Bell'});
});

app.use('/v1/examples', routes.example);

// Server
const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

module.exports = server;