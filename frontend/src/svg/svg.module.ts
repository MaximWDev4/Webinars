import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    EditComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    EditComponent,
    DeleteComponent,
  ]
})
export class SvgModule { }
