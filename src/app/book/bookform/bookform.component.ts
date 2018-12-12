import { Component, OnInit } from '@angular/core';
import { Book } from '../booklist/booklist.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookform',
  templateUrl: './bookform.component.html',
  styleUrls: ['./bookform.component.css']
})
export class BookformComponent implements OnInit {

  private mBook : Book

  constructor() { }

  ngOnInit() {
    this.mBook = new Book(1, 'test name', 12.34, 3, 'test desc', ['test categories'])
  }

}
