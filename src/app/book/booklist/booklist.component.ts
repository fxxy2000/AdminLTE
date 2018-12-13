import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, BookService } from '../book.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  private mBooks : Array<Book>

  constructor(private router : Router, private bookService : BookService) { 
  }

  ngOnInit() {
    this.mBooks = this.bookService.getBooks();
  }

  create() {
    this.router.navigateByUrl('/bookdetail/0')
  }

  modify(book : Book) {
    this.router.navigateByUrl('/bookdetail/' + book.id)
  }
}