const mongoose = require("mongoose");

const NewsEntrySchema = new mongoose.Schema({
  url: String,
  title: String,
  text: String,
  sentiment: String,
  emotion: String,
  date: Date,
});

module.exports = mongoose.model("NewsEntry", NewsEntrySchema);
