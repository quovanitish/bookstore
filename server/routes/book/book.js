const express = require("express");
const router = express.Router();
const auth = require("../../core/middleware/auth/auth");
const Book = require("../../core/db/models/book/book");

router.post("/books", async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).send();
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
