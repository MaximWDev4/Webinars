import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
// import {WebsocketService} from '../../_services/websocket.service';
// import {WS} from '../../_models/WSinterfaces';
import {Observable, Subscription} from 'rxjs';
// import {ActivatedRoute} from '@angular/router';
import {CommentsService} from '../../_services/comment.service';

export interface IMessage {
  id: number;
  text: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() roomNom = '';
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  comments = [];
  commentInputValue: string;
  messages$: Observable<IMessage[]>;
  // private counter$: Observable<number>;
  // private texts$: Observable<string[]>;
  constructor(
    private commentService: CommentsService,
    // private wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.commentService.joinRoom('chat' + this.roomNom);
    setTimeout(() => this.commentService.getMessage().subscribe(data => {
      this.comments.push({author: data.user, content: data.text});
      this.comments = [...this.comments];
      this._scrollToBottom();
    }), 500);
  }

  ngAfterViewInit(): void {
    this.virtualScroll.renderedRangeStream.subscribe(range => {
      console.log('range', range);
      console.log('range2', this.virtualScroll.getRenderedRange());
    });
  }

  liveComment(): void {
    if (this.commentInputValue.length > 0) {
      // this.wsService.send(WS.SEND.MESSAGE, { comment: this.commentInputValue, room: 'chat' + this.roomNom });
      this.commentService.msgToServer({text: this.commentInputValue, user: localStorage.getItem('userName'), room: 'chat' + this.roomNom});
      // this.comments.push({author: 'You', content: this.commentInputValue});
      // this.comments = [...this.comments];
      this.commentInputValue = undefined;
      this._scrollToBottom();
    }
  }

  private _scrollToBottom(): void {
    setTimeout(() => {
      this.virtualScroll.scrollTo({
        bottom: 0,
        behavior: 'smooth',
      });
    }, 0);
    setTimeout(() => {
      this.virtualScroll.scrollTo({
        bottom: 0,
        behavior: 'smooth',
      });
    }, 50);
  }

  ngOnDestroy(): void {
    this.commentService.leaveRoom('chat' + this.roomNom);
  }
}
