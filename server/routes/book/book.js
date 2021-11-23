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

router.patch("/books/:id/add", auth, async (req, res) => {
  const bookId = req.params.id;
  try {
    req.user.cart = req.user.cart.concat({ bookId });
    req.user.save();
    res.status(200).send(req.user.cart);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.patch("/books/:id/remove", auth, async (req, res) => {
  const bookId = req.params.id;
  try {
    req.user.cart = req.user.cart.filter((bookObject) => {
      return bookObject.bookId !== bookId;
    });
    req.user.save();
    res.status(200).send(req.user.cart);
  } catch (err) {
    res.status(400).send({ error: err.mesaage });
  }
});

router.get("/books/cart", auth, (req, res) => {
  try {
    const result = req.user.cart.map(async (bookId) => {
      return await Book.findOne({ _id: bookId.bookId });
    });

    Promise.all(result).then((resolvedResult) => {
      res.status(200).send(resolvedResult);
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
