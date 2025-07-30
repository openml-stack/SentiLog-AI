const mongoose = require('mongoose');

const analyzeResultSchema = new mongoose.Schema({
  fileName: String,
  wordCount: Number,
  sentenceCount: Number,
  sentiment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AnalyzeResult', analyzeResultSchema);
