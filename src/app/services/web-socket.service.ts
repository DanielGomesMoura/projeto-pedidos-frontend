import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080/ws-rank');
  }
  get messages(): Observable<string> {
    return new Observable(observer => {
      this.socket.onmessage = (event) => {
        observer.next(event.data);
      };
    });
  }
}