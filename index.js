const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const bookRouter = require('./src/routes/BookRouter')

const app = express();
const PORT = 3000;

// used for json data analysis
app.use(bodyParser.json());

server = app.listen(PORT, () => {
    console.log("Server started on port ${PORT}");
});

// It uses the bookRouter middleware to route requests to the '/api/books' path.
app.use('/api/books', bookRouter)

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log("Not connected to database");
    });
module.exports = app;
