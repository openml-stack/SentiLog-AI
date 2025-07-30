import mongoose from 'mongoose';

const JournalEntrySchema = new mongoose.Schema({
  text: { type: String, required: true },
  sentiment: String,
  emotion: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('JournalEntry', JournalEntrySchema); 