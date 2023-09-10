const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  user: mongoose.Types.ObjectId,
});

module.exports = mongoose.model('Url', urlSchema);
