import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, BookService } from '../book.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  private mBooks : Array<Book>;
  private mFilter : FormControl;
  private mKeywords : string;

  constructor(private router : Router, private bookService : BookService) { 
  }

  ngOnInit() {
    this.mBooks = this.bookService.getBooks();
    this.mFilter = new FormControl();
    this.mFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.mKeywords = value;
      });
  }

  create() {
    this.router.navigateByUrl('/bookdetail/0')
  }

  modify(book : Book) {
    this.router.navigateByUrl('/bookdetail/' + book.id)
  }

  onKeyUp(searchName : string) {
    
  }
}