const express = require('express');
const router = express.Router();

// Import your song controller
const travelController = require('../controllers/travel.controller');

// Define your API endpoints
router.get('/get-all-travel',  travelController.getAllTravel);
router.post('/create-travel', travelController.createTravel);
router.put('/update-travel/:id', travelController.updateTravel);
router.delete('/delete-travel/:id', travelController.deleteTravel);

module.exports = router;