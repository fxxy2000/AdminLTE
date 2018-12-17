import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BookService {
  private baseUrl = "http://127.0.0.1:5000/api/";
  private headers : HttpHeaders = new HttpHeaders()
  .set("Accept", "application/json")
  .set("Content-Type", "application/json");

  constructor(public httpClient : HttpClient) { }

  getBookById(id : number) : Observable<any>{
    return this.httpClient.get(this.baseUrl + 'book/' + id);
  }

  getBooks() : Observable<any> {
    return this.httpClient.get(this.baseUrl + 'book');
  }

  createOrUpdateBook(book : any) {
    return this.httpClient.post(this.baseUrl + 'book/createOrUpdate/' + book.id, book);
  }

  searchBookByName(name : string) : Observable<any>{
    return this.httpClient.get(this.baseUrl + 'book/search/' + name);
  }

  deleteBookById(id : number) {
    return this.httpClient.delete(this.baseUrl + "book/" + id);
  }
}