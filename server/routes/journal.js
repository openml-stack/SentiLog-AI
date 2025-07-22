const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

// Create and analyze
router.post('/', journalController.createEntry);
// Get all
router.get('/', journalController.getEntries);
// Get one
router.get('/:id', journalController.getEntry);
// Delete
router.delete('/:id', journalController.deleteEntry);

module.exports = router; 