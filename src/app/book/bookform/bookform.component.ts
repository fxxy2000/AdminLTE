import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService, Book } from '../book.service';

@Component({
  selector: 'app-bookform',
  templateUrl: './bookform.component.html',
  styleUrls: ['./bookform.component.css']
})
export class BookformComponent implements OnInit {

  private mBook : Book;
  private rating : number;

  constructor(private route: ActivatedRoute, private router: Router, private bookService : BookService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.mBook = this.bookService.getBookById(id);
    this.rating = this.mBook.rating;
  }

  updateRating(newRating : number) {
    this.rating = newRating;
  }

  cancel() {
    this.router.navigateByUrl('/booklist');
  }

  save() {
    if(this.mBook.rating != this.rating) {
      this.mBook.rating = this.rating;
    }
    this.router.navigateByUrl('/booklist');
  }
}
