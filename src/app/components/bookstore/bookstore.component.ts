import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookstoreService } from 'src/app/services/bookstore/bookstore.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Book } from 'src/models/book/book';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css'],
})
export class BookstoreComponent implements OnInit {
  books!: Book[];
  filteredBooks!: Book[];
  action: string = 'Add to cart';
  modalTitle: string = 'Please authenticate';
  modalBody: string = 'Log in first to add a book to the cart.';

  constructor(
    private bookService: BookstoreService,
    public authService: AuthService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.refreshBooks();
  }

  private refreshBooks = (): void => {
    this.bookService.broadcastBooks.subscribe((result) => {
      this.books = result;
    });
  };

  handleAddToCart = (bookId: string): void => {
    if (!this.authService.isLoggedIn()) {
      this.modalService.openPopup();
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

  handleGenreFilter = async (genre: string) => {
    this.refreshBooks();
    this.filteredBooks = this.books.filter((bookObject) => {
      return bookObject.genre.toLowerCase().includes(genre);
    });

    this.books = this.filteredBooks;
  };

  handleAuthorFilter = (author: string): void => {
    this.refreshBooks();
    this.filteredBooks = this.books.filter((bookObject) => {
      return bookObject.author.toLowerCase().includes(author);
    });

    this.books = this.filteredBooks;
  };

  handlePriceFilter = (price: Number): void => {
    if (price === 0) {
      this.refreshBooks();
      return;
    }

    this.refreshBooks();
    this.filteredBooks = this.books.filter((bookObject) => {
      return bookObject.price === price;
    });

    this.books = this.filteredBooks;
  };

  handleResetFilter = (): void => {
    this.refreshBooks();
  };
}
