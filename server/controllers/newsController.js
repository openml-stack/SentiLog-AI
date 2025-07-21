const NewsEntry = require('../models/NewsEntry');
const axios = require('axios');

/**
 * Creates a new news entry with sentiment and emotion analysis
 * 
 * @route POST /api/news
 * @desc Analyzes news article text using ML service and stores entry with sentiment/emotion data
 * @access Public (add authentication if needed)
 * 
 * @param {Object} req.body - Request body containing news data
 * @param {string} req.body.url - URL of the news article
 * @param {string} req.body.title - Title of the news article
 * @param {string} req.body.text - Full text content of the article for analysis
 * @param {Date} req.body.date - Publication date of the article
 * 
 * @returns {Object} 201 - Created news entry with sentiment and emotion analysis
 * @returns {Object} 500 - Server error if ML service fails or database error
 */

exports.createEntry = async (req, res, next) => {
  try {
    // Extract news article data from request body
    const { url, title, text, date } = req.body;

    // Call ML service (running on port 5001) to analyze sentiment and emotion
    // This sends the article text to a Python/ML microservice for analysis
    const mlRes = await axios.post('http://localhost:5001/predict', { text });

    // Extract sentiment (positive/negative/neutral) and emotion data from ML response
    const { sentiment, emotion } = mlRes.data;

     // Create new news entry in database with original data + ML analysis results
    const entry = await NewsEntry.create({ url, title, sentiment, emotion, date });

    // Return the created entry with 201 status (Created)
    res.status(201).json(entry);
  } catch (err) {
    // Pass any errors (ML service down, database issues, etc.) to error handler middleware
    next(err);
  }
};

/**
 * Retrieves all news entries sorted by date (newest first)
 * 
 * @route GET /api/news
 * @desc Fetches all stored news entries with their sentiment/emotion analysis
 * @access Public (add authentication if needed)
 * 
 * @returns {Array} 200 - Array of news entries sorted by date (descending)
 * @returns {Object} 500 - Server error if database query fails
 */

exports.getEntries = async (req, res, next) => {
  try {
    // Fetch all news entries from database, sorted by date (newest first)
    // This returns entries with all fields: url, title, sentiment, emotion, date
    const entries = await NewsEntry.find().sort({ date: -1 });

    // Return the entries array
    res.json(entries);

  } catch (err) {
    // Pass any errors (ML service down, database issues, etc.) to error handler middleware
    next(err);
  }
};

/**
 * Retrieves all news entries sorted by date (newest first)
 * 
 * @route GET /api/news
 * @desc Fetches all stored news entries with their sentiment/emotion analysis
 * @access Public (add authentication if needed)
 * 
 * @returns {Array} 200 - Array of news entries sorted by date (descending)
 * @returns {Object} 500 - Server error if database query fails
 */

exports.getEntry = async (req, res, next) => {
  try {
    // Fetch all news entries from database, sorted by date (newest first)
    // This returns entries with all fields: url, title, sentiment, emotion, date
    const entry = await NewsEntry.findById(req.params.id);

    if (!entry) return res.status(404).json({ error: 'Not found' });
    // Return the entries array
    res.json(entry);
  } catch (err) {
    // Pass any errors (ML service down, database issues, etc.) to error handler middleware
    next(err);
  }
};

/**
 * Deletes a news entry by ID
 * 
 * @route DELETE /api/news/:id
 * @desc Removes a specific news entry from the database
 * @access Public (add authentication if needed)
 * 
 * @param {string} req.params.id - MongoDB ObjectId of the news entry to delete
 * 
 * @returns {Object} 200 - Success message confirming deletion
 * @returns {Object} 404 - Entry not found error
 * @returns {Object} 500 - Server error if database operation fails
 */

exports.deleteEntry = async (req, res, next) => {
  try {
    // Find and delete news entry by MongoDB ObjectId in one operation
    const entry = await NewsEntry.findByIdAndDelete(req.params.id);

    // Return 404 if entry doesn't exist (nothing to delete)
    if (!entry) return res.status(404).json({ error: 'Not found' });

    // Return success message confirming deletion
    res.json({ message: 'Deleted' });
  } catch (err) {
    // Pass errors (invalid ObjectId format, database issues) to error handler
    next(err);
  }
}; 