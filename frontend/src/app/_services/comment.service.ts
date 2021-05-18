import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Comment } from 'src/app/_models/comment.model';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private socket: Socket) { }

  msgToServer(data: Comment): void {
    this.socket.emit('msgToServer', data);
  }

  joinRoom(roomId: string): void {
    this.socket.emit('joinRoom', roomId);
  }

  leaveRoom(roomId: string): void {
    this.socket.emit('leaveRoom', roomId);
  }

  getMessage(): Observable<any> {
    return this.socket.fromEvent('msgToClient').pipe(map((data) => data));
  }
}
