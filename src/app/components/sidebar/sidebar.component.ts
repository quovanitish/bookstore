import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(private formBuilder: FormBuilder) {}

  genreFilterForm?: FormGroup;
  authorFilterForm?: FormGroup;

  private subscriptions: Subscription[] = [];

  // static data for genres and authors
  // Todo: Implement a service to dynamically fetch these records
  genres = [
    { id: 1, genre: 'Thriller' },
    { id: 2, genre: 'Novel' },
    { id: 3, genre: 'Drama' },
    { id: 4, genre: 'Fiction' },
  ];

  authors = [
    { id: 1, author: 'Austen' },
    { id: 2, author: 'Tolstoy' },
    { id: 3, author: 'Woolf' },
    { id: 4, author: 'Michael' },
    { id: 5, author: 'Twain' },
    { id: 6, author: 'Dickens' },
    { id: 7, author: 'Michael' },
  ];

  @Output()
  filterGenre = new EventEmitter<string>();
  @Output()
  filterAuthor = new EventEmitter<string>();
  @Output()
  filterPrice = new EventEmitter<Number>();
  @Output()
  resetFilter = new EventEmitter<''>();

  ngOnInit(): void {
    this.genreFilterForm = this.formBuilder.group({
      genre: '',
    });

    this.authorFilterForm = this.formBuilder.group({
      author: '',
    });

    const genreSub = this.genreFilterForm
      .get('genre')
      ?.valueChanges.subscribe((val) => {
        this.handleGenreFilter(val);
      });
    this.subscriptions.push(genreSub!);

    const filterSub = this.authorFilterForm
      .get('author')
      ?.valueChanges.subscribe((val) => {
        this.handleAuthorFilter(val);
      });
    this.subscriptions.push(filterSub!);
  }

  handleGenreFilter = (genre: string): void => {
    this.filterGenre.emit(genre.toLowerCase());
  };

  handleAuthorFilter = (author: string): void => {
    this.filterAuthor.emit(author.toLowerCase());
  };

  handlePriceFilter = (val: string): void => {
    this.filterPrice.emit(Number(val));
  };

  handleResetFilter = (): void => {
    this.resetFilter.emit();
  };

  // unsubscribe to filter subscriptions
  ngOnDestroy() {
    this.subscriptions.map((sub) => sub.unsubscribe());
  }
}
