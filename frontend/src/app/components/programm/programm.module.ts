import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgrammComponent} from './programm.component';
import { NgxTimelineVerticalModule } from 'ngx-timeline-vertical';

@NgModule ({
  imports: [CommonModule, NgxTimelineVerticalModule],
  exports: [ProgrammComponent],
  declarations: [ProgrammComponent],
})

export class ProgrammModule {
}
