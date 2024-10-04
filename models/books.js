const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  datePublished: { type: Date, required: true },
  dateAdded: { type: Date, default: Date.now },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isBorrowed: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', bookSchema);
