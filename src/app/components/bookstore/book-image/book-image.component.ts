import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-image',
  templateUrl: './book-image.component.html',
  styleUrls: ['./book-image.component.css'],
})
export class BookImageComponent implements OnInit {
  constructor() {}

  @Input() imageLink!: string;
  
  ngOnInit(): void {}
}
