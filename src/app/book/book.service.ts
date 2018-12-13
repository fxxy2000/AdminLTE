import { Injectable } from '@angular/core';

@Injectable()
export class BookService {
  private mBooks : Book[] = [
    new Book(1, "Android Book 1", 23.34, 4, "A book for Android", ["Financial" , "IT"]),
    new Book(2, "Java Book 2", 24.15, 1, "A book for Java", ["Internet" , "IT"]),
    new Book(3, "Ios Book 3", 33.45, 3, "A book for Ios", ["Financial" , "IT", "Internet"]),
    new Book(4, "C# Book 4", 43.45, 3.5, "A book for C#", ["Financial" , "IT"]),
    new Book(5, "Python Book 5", 53.45, 5, "A book for Python", ["IT"]),
    new Book(6, "C++ Book 6", 63.45, 4, "A book for C++", ["Financial" , "Internet"]),
    new Book(7, "ASP.NET Book 7", 73.45, 2, "A book for ASP.NET", ["Internet"]),
    new Book(8, "Testing Book 8", 83.45, 3.5, "A book for Testing", ["Internet" , "IT"]),
  ];

  constructor() { }

  getBookById(id : number) {
    let book : Book;
    this.mBooks.forEach(element => {
      if(element.id == id) {
        book = element;
      }
    });

    if (!book) {
      book = new Book(0, "", null, null, "", []);
    }
    return book;
  }

  getBooks() {
    return this.mBooks;
  }
}

export class Book {
  constructor(
    public id : number,
    public name : String,
    public price : number,
    public rating : number,
    public desc : String,
    public categories : Array<String>  
  ){ }
}