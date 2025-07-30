import JournalEntry from '../models/JournalEntry.js';
import axios from 'axios';

/**
 * Creates a new journal entry with sentiment and emotion analysis
 * 
 * @route POST /api/journal
 * @desc Analyzes user's journal text using ML service and stores entry with sentiment/emotion data
 * @access Public (add authentication if needed)
 * 
 * @param {Object} req.body - Request body containing journal data
 * @param {string} req.body.text - User's journal entry text for analysis
 * 
 * @returns {Object} 201 - Created journal entry with sentiment and emotion analysis
 * @returns {Object} 500 - Server error if ML service fails or database error
 */

export const createEntry = async (req, res, next) => {
  try {
    const { text } = req.body;
    const mlRes = await axios.post('http://localhost:5001/predict', { text });
    const { sentiment, emotion } = mlRes.data;
    const entry = await JournalEntry.create({ text, sentiment, emotion });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves all journal entries sorted by creation date (newest first)
 * 
 * @route GET /api/journal
 * @desc Fetches all stored journal entries with their sentiment/emotion analysis
 * @access Public (add authentication if needed)
 * 
 * @returns {Array} 200 - Array of journal entries sorted by creation date (descending)
 * @returns {Object} 500 - Server error if database query fails
 */
export const getEntries = async (req, res, next) => {
  try {
    const entries = await JournalEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves a single journal entry by ID
 * 
 * @route GET /api/journal/:id
 * @desc Fetches a specific journal entry with sentiment/emotion analysis
 * @access Public (add authentication if needed)
 * 
 * @param {string} req.params.id - MongoDB ObjectId of the journal entry
 * 
 * @returns {Object} 200 - Single journal entry object with all fields
 * @returns {Object} 404 - Entry not found error
 * @returns {Object} 500 - Server error if database query fails
 */

export const getEntry = async (req, res, next) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes a journal entry by ID
 * 
 * @route DELETE /api/journal/:id
 * @desc Removes a specific journal entry from the database
 * @access Public (add authentication if needed)
 * 
 * @param {string} req.params.id - MongoDB ObjectId of the journal entry to delete
 * 
 * @returns {Object} 200 - Success message confirming deletion
 * @returns {Object} 404 - Entry not found error
 * @returns {Object} 500 - Server error if database operation fails
 */

export const deleteEntry = async (req, res, next) => {
  try {
    const entry = await JournalEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}; 