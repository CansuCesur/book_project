const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRouter = require('./src/routes/BookRouter')
const { redisClient } = require('./redisClient')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const logger = require('./logger')

const app = express();
const PORT = 3000;

// used for json data analysis
app.use(bodyParser.json());

server = app.listen(PORT, () => {
    logger.info("Server started on port ${PORT}");
});

app.use(cors());

// It uses the bookRouter middleware to route requests to the '/api/books' path.
app.use('/api/books', bookRouter)

// swagger config
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites:true
}).then(() => {
    logger.info("Connected to database");
})
    .catch(err => {
        logger.error("Not connected to database");
    });

module.exports = { app, server, mongoose };

// Redis connection
redisClient.connect();