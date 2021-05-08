import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CommonModule} from '@angular/common';
import {SliderComponent} from './slider.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    SliderComponent
  ],
  declarations: [
    SliderComponent
  ]
})
export class SliderModule{
}
