const axios = require('axios');

const logRequestAndForward = async (req, res, next) => {
    try {
        const logServiceUrl = process.env.FIREBASE_LOG_SERVICE_URL; // Get the URL from environment variables
        if (!logServiceUrl) {
            return res.status(500).json({ error: 'Internal Server Error: Logging service URL not configured.' });
        }
        // Prepare the log data
        const logData = {
            method: req.method,
            url: req.originalUrl,
            query: req.query,
            body: req.body,
        };
        // Forward the log request to the firebase service
        const response = await axios.post(process.env.FIREBASE_LOG_SERVICE_URL, logData);
        next();
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = {
    logRequestAndForward
};
