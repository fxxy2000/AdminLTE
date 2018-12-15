import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService, Book } from '../book.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-bookform',
  templateUrl: './bookform.component.html',
  styleUrls: ['./bookform.component.css']
})
export class BookformComponent implements OnInit {

  private formModule : FormGroup;
  private categories = ['IT', 'Financial', 'Internet'];
  private mBook : Book;
  private rating : number;

  constructor(private route: ActivatedRoute, private router: Router, private bookService : BookService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.mBook = this.bookService.getBookById(id);
    this.rating = this.mBook.rating;

    let formBuilder = new FormBuilder();
    this.formModule = formBuilder.group({
      bookName : [this.mBook.name, [Validators.required, Validators.minLength(3)]],
      bookPrice : [this.mBook.price, [Validators.required]],
      bookDesc : [this.mBook.desc],
      bookCategory : formBuilder.array([
        [this.mBook.categories.includes(this.categories[0])],
        [this.mBook.categories.includes(this.categories[1])],
        [this.mBook.categories.includes(this.categories[2])]
      ], categoryValidator)
    });
  }

  updateRating(newRating : number) {
    this.rating = newRating;
  }

  cancel() {
    this.router.navigateByUrl('/booklist');
  }

  save() {
    let newCategories = [];
    for(var i=0; i<3; i++){
      if(this.formModule.value.bookCategory[i]) {
        newCategories.push(this.categories[i]);
      }
    }

    if(this.mBook.rating != this.rating) {
      this.mBook.rating = this.rating;
    }

    if(this.mBook.name != this.formModule.value.bookName) {
      this.mBook.name = this.formModule.value.bookName;
    }

    if(this.mBook.price != this.formModule.value.bookPrice) {
      this.mBook.price = this.formModule.value.bookPrice;
    }

    if(this.mBook.desc != this.formModule.value.bookDesc) {
      this.mBook.desc = this.formModule.value.bookDesc;
    }

    if(this.mBook.categories != newCategories) {
      this.mBook.categories = newCategories;
    }

    this.router.navigateByUrl('/booklist');
  }
}

export function categoryValidator(categories : FormArray) {
  let isAnyCategorySelectled = false;
  categories.controls.forEach(category => {
    isAnyCategorySelectled = isAnyCategorySelectled || category.value;
  });
  return isAnyCategorySelectled ? null : {categories : true};
}
