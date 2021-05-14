import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { CheckmarkComponent } from './checkmark/checkmark.component';
import { SendComponent } from './send/send.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [
    EditComponent,
    DeleteComponent,
    CheckmarkComponent,
    SendComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
  ],
    exports: [
        EditComponent,
        DeleteComponent,
        CheckmarkComponent,
        SendComponent,
        LogoComponent,
    ]
})
export class SvgModule { }
