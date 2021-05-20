import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownItemComponent} from './dropdown-item.component';


@NgModule({
  imports: [
    CommonModule,

  ],
  exports: [
    DropdownItemComponent,
  ],
  declarations: [
    DropdownItemComponent,
  ]
})
export class DropdownItemModule {
}
