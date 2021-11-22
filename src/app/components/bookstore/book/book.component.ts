import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output()
  onButtonClick = new EventEmitter<string>();

  ngOnInit(): void {}

  handleClick = (bookId: string): void => {
    this.onButtonClick.emit(bookId);
  };
}
