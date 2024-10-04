const Book = require('../models/book');

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ deleted: false });
    res.send(books);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.deleted) return res.status(404).send({ error: "Book not found" });
    res.send(book);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).send({ error: "Book not found" });
    res.send(book);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.softDeleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!book) return res.status(404).send({ error: "Book not found" });
    res.send(book);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
