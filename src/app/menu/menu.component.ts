import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public router : Router) { }

  private mMenus : Array<Menu>
  private mCurrentId : number

  ngOnInit() {
    this.mMenus = [
      new Menu(1, 'Dashboard', 'dashboard', 'This is the dashboard desc.'),
      new Menu(2, 'Book List', 'booklist', 'Look up the book from here.')
    ]
  }

  nav(menu : Menu) {
    this.router.navigateByUrl(menu.link)
    this.mCurrentId = menu.id
  }
}

export class Menu { 
  constructor(
    public id : number,
    public name : string,
    public link : string,
    public desc : string) {}

}