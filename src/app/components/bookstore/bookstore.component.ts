import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookstoreService } from 'src/app/services/bookstore/bookstore.service';
import { Book } from 'src/models/book/book';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css'],
})
export class BookstoreComponent implements OnInit {
  books!: Book[];
  filteredBooks!: Book[];
  action: string = 'Add to cart';

  constructor(
    private bookService: BookstoreService,
    public authService: AuthService,
    private router: Router
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

  handleCartClick = (): void => {
    this.router.navigate([environment.ui.cart]);
  };

  handleLoginClick = (): void => {
    this.router.navigate([environment.ui.login]);
  };

  handleSignUpClick = (): void => {
    this.router.navigate([environment.ui.signup]);
  };

  handleLogOutClick = (): void => {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Logout Success');
        localStorage.removeItem('token');
        this.router.navigate([environment.ui.bookstore]);
      },
      (error) => {
        console.log(error);
      }
    );
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
}
