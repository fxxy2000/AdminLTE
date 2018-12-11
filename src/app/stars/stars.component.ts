import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input()
  private mRating : number = 0

  private mStars : boolean[]

  constructor() { }

  ngOnInit() {
    this.mStars = []
    for(let i=1;i<=5;i++) {
      this.mStars.push(i > this.mRating)
    }
  }
}
