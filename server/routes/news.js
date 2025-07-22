const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Create and analyze
router.post('/', newsController.createEntry);
// Get all
router.get('/', newsController.getEntries);
// Get one
router.get('/:id', newsController.getEntry);
// Delete
router.delete('/:id', newsController.deleteEntry);

module.exports = router; 