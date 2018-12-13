import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService, Book } from '../book.service';

@Component({
  selector: 'app-bookform',
  templateUrl: './bookform.component.html',
  styleUrls: ['./bookform.component.css']
})
export class BookformComponent implements OnInit {

  private mBook : Book

  constructor(private route: ActivatedRoute, private router: Router, private bookService : BookService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.mBook = this.bookService.getBookById(id);
  }

  cancel() {
    this.router.navigateByUrl('/booklist');
  }

  save() {
    this.router.navigateByUrl('/booklist');
  }
}
