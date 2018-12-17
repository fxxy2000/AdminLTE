import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SseService {

  constructor(private ngZone : NgZone) { }

  observeStream(url : string) : Observable<any> {
    const src = new EventSource(url);

    return new Observable<any> (obs => {
      src.onmessage = event => {
        this.ngZone.run(() => obs.next(event.data));
      }
    })
  }
}
