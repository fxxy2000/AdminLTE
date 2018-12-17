import { Component, OnInit } from '@angular/core';
import { SseService } from '../sse.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private messageCount : number = 0;

  constructor(public sseService : SseService, public http : HttpClient) { 
    sseService.observeStream("http://127.0.0.1:5050/subscribe").subscribe(data => {
      console.log(data)
      this.messageCount = data;
    });
  }

  ngOnInit() {
  }
}
