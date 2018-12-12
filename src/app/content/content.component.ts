import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu/menu.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  pageTitle : string
  pageDesc : string

  constructor(public router : Router) { 
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        if (event.url == '/dashboard') {
          this.pageTitle = 'Dashboard'
          this.pageDesc = 'Welcome to Dashboard.'
        } else if(event.url.startsWith('/booklist')) {
          this.pageTitle = 'Book List'
          this.pageDesc = 'Look up books here.'
        }
      })
  }

  ngOnInit() {
  }

}
