import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebinarRoomComponent} from './webinar-room.component';
import {WebinarRoomRoutingModule} from './webinar-room.routing.module';
import {MediaPlayerModule} from '../../components/media-player/media-player.module';
import {CommentsModule} from '../../components/comments/comments.module';

@NgModule({
   imports: [
     CommonModule,
     MediaPlayerModule,
     CommentsModule,
     WebinarRoomRoutingModule
   ],
   declarations: [
    WebinarRoomComponent
   ]
})
export class WebinarRoomModule{
}

