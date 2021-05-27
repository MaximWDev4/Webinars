import {NgModule} from '@angular/core';
import {CommentsComponent} from './comments.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {SvgModule} from '../../../svg/svg.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {CommentsService} from '../../_services/comment.service';
import {environment} from '../../../environments/environment';
const config: SocketIoConfig = { url: `${environment.apiUrl}/chat`, options: {} };

@NgModule({
  exports: [
    CommentsComponent
  ],
    imports: [
        SocketIoModule.forRoot(config),
        CommonModule,
        FormsModule,
        ScrollingModule,
        TextFieldModule,
        MatInputModule,
        // WebsocketModule.config({url: `ws://localhost:50051/chat`}),
        SvgModule
    ],
  declarations: [
    CommentsComponent
  ],
  providers: [
    CommentsService,
    CdkVirtualScrollViewport,
  ]
})

export class CommentsModule{
}
