const functions = require('firebase-functions');

exports.logRequest = functions.https.onRequest(async (req, res) => {
    try {
        // This Firebase function logs incoming HTTP requests. 
        // The log statements (console.log and console.error) are recorded in Firebase logs, 
        // which can be viewed in the Firebase Console under the Functions tab. 
        // The logged information includes the HTTP method, URL, and query parameters of the request.
        console.log(`Firebase Function - Request to ${req.body.method} ${req.body.url} - Query: ${JSON.stringify(req.body.query)}`);
        res.status(200).send('Logged');
    } catch (error) {
        console.error(`Error in Firebase function: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});