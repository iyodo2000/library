const mongoose = require('mongoose');

const borrowRecordSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borrowedAt: { type: Date, default: Date.now },
  returnDate: { type: Date },
  returnedAt: { type: Date },
  status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' },
});

module.exports = mongoose.model('BorrowRecord', borrowRecordSchema);
