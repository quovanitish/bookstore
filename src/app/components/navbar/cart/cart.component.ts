import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookstoreService } from 'src/app/services/bookstore/bookstore.service';
import { Book } from 'src/models/book/book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  books: Book[] = [];
  action: string = 'Remove from cart';

  constructor(
    private bookService: BookstoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bookService
      .getCart()
      .then((res) => {
        this.books = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRemoveFromCart = (bookId: string): void => {
    this.books = this.books.filter((bookObject) => {
      return bookId !== bookObject.id;
    });

    this.bookService.removeFromCart(bookId).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
