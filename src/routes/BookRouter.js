const express = require('express');
const router = express.Router();
const bookValidator = require('../middleware/RequestValidator');
const bookController = require('../controllers/BookController.js');
const { logRequestAndForward } = require('../middleware/FirebaseLogger.js');

// Http call logs for firebase
router.use(logRequestAndForward);

// Routes API routes for book transactions
router.post('/create', bookValidator.validateBookRequest, bookController.create);
router.get('/all', bookController.getAll);
router.delete('/deleteById/:id', bookValidator.validateBookId, bookController.deleteById);
router.put('/updateById/:id', bookValidator.validateBookId, bookValidator.validateBookRequest, bookController.updateById);

module.exports = router;