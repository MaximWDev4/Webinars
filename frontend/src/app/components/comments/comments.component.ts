import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {WebsocketService} from '../../_services/websocket.service';
import {WS} from '../../_models/WSinterfaces';
import {Observable} from 'rxjs';

export interface IMessage {
  id: number;
  text: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, AfterViewInit{
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  comments = [{author: 'Mike', content: 'Здравствуйте!'},
    {author: 'El', content: 'здрасте'}, {author: 'Mike', content: 'Привет всем'},
    {author: 'Mike', content: 'Меня слышно?'}, {author: 'El', content: 'Да'},
    {author: 'Mike', content: 'Начнем'}, {author: 'El', content: 'Давайте'},
    {author: 'Mike', content: 'Съешь же ещё этих мягких французских булок да выпей чаю '}, {author: 'El', content: 'Эм...'}];
  commentInputValue: string;
  messages$: Observable<IMessage[]>;
  // private counter$: Observable<number>;
  // private texts$: Observable<string[]>;
  constructor(private wsService: WebsocketService) {
    this.wsService.on<IMessage[]>('messages')
      .subscribe((messages: IMessage[]) => {
        console.log(messages);
        this.wsService.send('text', 'Test Text!');
      });
  }

  ngOnInit(): void {

    // get messages
    this.messages$ = this.wsService.on<IMessage[]>(WS.ON.MESSAGES);
    // // get counter
    // this.counter$ = this.wsService.on<number>(WS.ON.COUNTER);
    //
    // // get texts
    // this.texts$ = this.wsService.on<string[]>(WS.ON.UPDATE_TEXTS);
  }

  ngAfterViewInit(): void {
    this.virtualScroll.renderedRangeStream.subscribe(range => {
      // console.log('range', range);
      // console.log('range2', this.virtualScroll.getRenderedRange());
      // if (this.virtualScroll.getRenderedRange().end % 10 === 0) {
      //   this.nextSearchPage(++this.searchPageNumber);
      // }
    });
  }

  liveComment(): void {
    if (this.commentInputValue.length > 0) {
      this.wsService.send(WS.SEND.TEXT, this.commentInputValue);
      this.comments.push({author: 'You', content: this.commentInputValue});
      this.comments = [...this.comments];
      this.commentInputValue = undefined;
      this.virtualScroll.scrollToIndex(this.comments.length, 'smooth');
    }
  }
}
