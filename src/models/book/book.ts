export class Book {
  id: string;
  title: string;
  author: string;
  year: Number;
  genre: string;
  price: Number;
  cover: string;

  constructor(
    id: string,
    title: string,
    author: string,
    year: Number,
    genre: string,
    price: Number,
    cover: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.price = price;
    this.cover = cover;
  }
}
