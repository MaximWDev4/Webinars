import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastComponent} from './toast.component';
import {ToastrModule} from 'ngx-toastr';
import {ErrorService} from '../../_services/error.service';
import {InfoService} from '../../_services/info.service';
import {SuccessService} from '../../_services/success.service';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot(),

  ],
  exports: [
    ToastComponent
  ],
  declarations: [
    ToastComponent
  ],
  providers: [
    ErrorService,
    InfoService,
    SuccessService
  ]
})

export class ToastModule{ }
