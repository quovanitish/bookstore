import { Injectable } from '@angular/core';
import { Book } from 'src/models/book/book';

@Injectable({
  providedIn: 'root',
})
export class FormatDataService {
  constructor() {}

  formatBooksData(rawData: any): Book[] {
    const result: Book[] = rawData.map((bookObj: any) => {
      return new Book(
        bookObj._id,
        bookObj.title,
        bookObj.author,
        bookObj.year,
        bookObj.genre,
        bookObj.price,
        bookObj.cover
      );
    });

    return result;
  }
}
