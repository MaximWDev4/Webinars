import {NgModule, OnInit} from '@angular/core';
import {CommentsComponent} from './comments.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {WebsocketModule} from '../../_services/websocket.module';
import {environment} from '../../../environments/environment';
import {SvgModule} from '../../../svg/svg.module';


@NgModule({
  exports: [
    CommentsComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ScrollingModule,
        TextFieldModule,
        MatInputModule,
        WebsocketModule.config({url: `ws://localhost:8000/ws/chat/1/`}),
        SvgModule
    ],
  declarations: [
    CommentsComponent
  ],
  providers: [
    CdkVirtualScrollViewport,
  ]
})

export class CommentsModule{
}
