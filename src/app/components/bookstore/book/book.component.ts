import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookstoreService } from 'src/app/services/bookstore/bookstore.service';
import { Book } from 'src/models/book/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  constructor(
    private bookService: BookstoreService,
    private authService: AuthService
  ) {}

  @Input() book!: Book;
  @Input() action!: string;

  ngOnInit(): void {}

  handleAddToCart = (bookId: string): void => {
    if (!this.authService.isLoggedIn()) {
      alert('Please log in first to add a book to the cart');
      return;
    } else {
      this.bookService.addToCart(bookId).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
}
