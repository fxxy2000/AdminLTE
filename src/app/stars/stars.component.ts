import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input()
  private mRating : number = 0

  @Input()
  private isReadOnly = true

  @Output()
  private newRating : EventEmitter<number> = new EventEmitter()

  private mStars : boolean[]

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes : SimpleChanges) {
    this.mStars = []
    for(let i=1;i<=5;i++) {
      this.mStars.push(i > this.mRating)
    }
  }

  onStarClicked(index : number) {
    if(!this.isReadOnly) {
      this.mRating = index + 1
      this.newRating.emit(this.mRating);
    }
  }
}
