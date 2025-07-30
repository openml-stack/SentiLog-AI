

import NewsEntry from '../models/NewsEntry.js';
import axios from 'axios';

/**
 * Creates a new news entry with sentiment and emotion analysis
 *
 * @route POST /api/news
 * @desc Analyzes news article text using ML service and stores entry with sentiment/emotion data
 * @access Public
 */
export const createEntry = async (req, res, next) => {
  try {
    const { url, title, text, date } = req.body;

    // Call ML service (running on port 5001) to analyze sentiment and emotion (commented out for now)
    // const mlRes = await axios.post('http://localhost:5001/predict', { text });
    // const { sentiment, emotion } = mlRes.data;

    const sentiment = text.includes('bad') ? 'negative' : 'positive';
    const emotion = text.includes('sad') ? 'sadness' : 'joy';

    const entry = await NewsEntry.create({
      url,
      title,
      text,
      sentiment,
      emotion,
      date,
    });

    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves all news entries sorted by date (newest first)
 *
 * @route GET /api/news
 * @desc Fetches all stored news entries with their sentiment/emotion analysis
 * @access Public
 */
export const getEntries = async (req, res, next) => {
  try {
    const entries = await NewsEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves a single news entry by ID
 *
 * @route GET /api/news/:id
 * @desc Fetches one news entry with its sentiment/emotion analysis
 * @access Public
 */
export const getEntry = async (req, res, next) => {
  try {
    const entry = await NewsEntry.findById(req.params.id);

    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes a news entry by ID
 *
 * @route DELETE /api/news/:id
 * @desc Removes a specific news entry from the database
 * @access Public
 */
export const deleteEntry = async (req, res, next) => {
  try {
    const entry = await NewsEntry.findByIdAndDelete(req.params.id);

    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    next(err);
  }
};
