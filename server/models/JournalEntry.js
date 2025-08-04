const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
  text: { type: String, required: true },
  sentiment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JournalEntry', JournalEntrySchema); 