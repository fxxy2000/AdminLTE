import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  private mBooks : Observable<any>;
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
        if(value) {
          this.mBooks = this.bookService.searchBookByName(value);
        } else {
          this.mBooks = this.bookService.getBooks();
        }
      });
  }

  create() {
    this.router.navigateByUrl('/bookdetail/0')
  }

  modify(book : any) {
    this.router.navigateByUrl('/bookdetail/' + book.id)
  }

  delete(book : any) {
    this.bookService.deleteBookById(book.id).subscribe(
      () => {
        this.mBooks = this.bookService.getBooks();
      }, 
      error => {
        console.log(error)
      }
    );
  }
}