
import mongoose from 'mongoose';

const NewsEntrySchema = new mongoose.Schema({
  url: String,
  title: String,
  text: String,
  sentiment: String,
  emotion: String,
  date: Date,
});
export default mongoose.model('NewsEntry', NewsEntrySchema); 
