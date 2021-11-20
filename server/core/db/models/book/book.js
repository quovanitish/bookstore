const mongooose = require("mongoose");

const bookSchema = new mongooose.Schema({
  title: {
    type: String,
  },

  author: {
    type: String,
  },

  year: {
    type: Number,
  },

  genre: {
    type: String,
  },

  price: {
    type: Number,
  },
});

const Book = mongooose.model("Book", bookSchema);

module.exports = Book;
