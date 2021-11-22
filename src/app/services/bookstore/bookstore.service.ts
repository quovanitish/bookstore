import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Book } from 'src/models/book/book';
import { FormatDataService } from '../formatData/format-data.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookstoreService {
  private books = new BehaviorSubject<Book[]>([]);
  broadcastBooks = this.books.asObservable();
  constructor(
    private http: HttpClient,
    private formatService: FormatDataService
  ) {
    this.fetchBooks()
      .then((result) => {
        this.books.next(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // get all the books from the bookstore
  fetchBooks = (): Promise<Book[]> => {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.backendServer.url}books`).subscribe(
        (result) => {
          resolve(this.formatService.formatBooksData(result));
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  // add a book to the cart
  addToCart = (bookId: string): Observable<any> => {
    return this.http.patch(
      `${environment.backendServer.url}books/${bookId}/add`,
      {}
    );
  };

  // remove a book from the cart
  removeFromCart = (bookId: string): Observable<any> => {
    return this.http.patch(
      `${environment.backendServer.url}books/${bookId}/remove`,
      {}
    );
  };
}
