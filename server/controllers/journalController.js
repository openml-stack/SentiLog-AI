const JournalEntry = require('../models/JournalEntry');
const axios = require('axios');

/**
 * Creates a new journal entry with sentiment and emotion analysis
 * 
 * @route POST /api/journal
 * @desc Analyzes user's journal text using ML service and stores entry with sentiment/emotion data
 * @access Private (requires authentication)
 * 
 * @param {Object} req.body - Request body containing journal data
 * @param {string} req.body.text - User's journal entry text for analysis
 * @param {string} req.userid - User ID from JWT token
 * 
 * @returns {Object} 201 - Created journal entry with sentiment and emotion analysis
 * @returns {Object} 500 - Server error if ML service fails or database error
 */

exports.createEntry = async (req, res) => {
  try {
    const { text } = req.body;
  const userId = req.userid;
    const mlRes = await axios.post(`${process.env.ML_API_URL}/vader/analyze`, { text });
    const { sentiment, emotion } = mlRes.data;
    const entry = await JournalEntry.create({ userId, text, sentiment, emotion});


    // const { sentiment } = mlRes.data;
    // const entry = await JournalEntry.create({ text, sentiment });
    res.status(201).json(entry);
  } catch (err) {
    console.error('Error creating journal entry:', err.message);
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
};

/**
 * Retrieves all journal entries for the authenticated user sorted by creation date (newest first)
 * 
 * @route GET /api/journal
 * @desc Fetches user's journal entries with their sentiment/emotion analysis
 * @access Private (requires authentication)
 * 
 * @param {string} req.userid - User ID from JWT token
 * 
 * @returns {Array} 200 - Array of user's journal entries sorted by creation date (descending)
 * @returns {Object} 500 - Server error if database query fails
 */
exports.getEntries = async (req, res) => {
  try {
    const userId = req.userid;
    const entries = await JournalEntry.find({ userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error('Error fetching journal entries:', err.message);
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
};

/**
 * Retrieves a single journal entry by ID for the authenticated user
 * 
 * @route GET /api/journal/:id
 * @desc Fetches a specific journal entry with sentiment/emotion analysis
 * @access Private (requires authentication)
 * 
 * @param {string} req.params.id - MongoDB ObjectId of the journal entry
 * @param {string} req.userid - User ID from JWT token
 * 
 * @returns {Object} 200 - Single journal entry object with all fields
 * @returns {Object} 404 - Entry not found error
 * @returns {Object} 500 - Server error if database query fails
 */

exports.getEntry = async (req, res) => {
  try {
    const userId = req.userid;
    const entry = await JournalEntry.findOne({ _id: req.params.id, userId });
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) {
    console.error('Error fetching journal entry:', err.message);
    res.status(500).json({ error: 'Failed to fetch journal entry' });
  }
};

/**
 * Deletes a journal entry by ID for the authenticated user
 * 
 * @route DELETE /api/journal/:id
 * @desc Removes a specific journal entry from the database
 * @access Private (requires authentication)
 * 
 * @param {string} req.params.id - MongoDB ObjectId of the journal entry to delete
 * @param {string} req.userid - User ID from JWT token
 * 
 * @returns {Object} 200 - Success message confirming deletion
 * @returns {Object} 404 - Entry not found error
 * @returns {Object} 500 - Server error if database operation fails
 */

exports.deleteEntry = async (req, res) => {
  try {
    const userId = req.userid;
    const entry = await JournalEntry.findOneAndDelete({ _id: req.params.id, userId });
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting journal entry:', err.message);
    res.status(500).json({ error: 'Failed to delete journal entry' });
  }
};