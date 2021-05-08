import {NgModule} from '@angular/core';
import {MediaPlayerComponent} from './media-player.component';
import {CommonModule} from '@angular/common';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [MediaPlayerComponent],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule,
    MatProgressBarModule
  ],
  exports: [MediaPlayerComponent]
})

export class MediaPlayerModule {
}
