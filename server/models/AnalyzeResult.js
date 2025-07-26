import mongoose from 'mongoose';

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

export default mongoose.model('AnalyzeResult', analyzeResultSchema);
