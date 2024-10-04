const BorrowRecord = require('../models/borrowRecord');
const Book = require('../models/book');

exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (book.isBorrowed) return res.status(400).send({ error: "Book is already borrowed" });
    
    const borrowRecord = await BorrowRecord.create({
      book: req.params.bookId,
      borrowedBy: req.body.userId,
    });
    
    book.isBorrowed = true;
    await book.save();
    res.status(201).send(borrowRecord);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const borrowRecord = await BorrowRecord.findOneAndUpdate(
      { book: req.params.bookId, status: 'borrowed' },
      { status: 'returned', returnedAt: Date.now() },
      { new: true }
    );
    
    if (!borrowRecord) return res.status(404).send({ error: "Borrow record not found" });
    
    const book = await Book.findByIdAndUpdate(req.params.bookId, { isBorrowed: false }, { new: true });
    
    res.send(borrowRecord);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
