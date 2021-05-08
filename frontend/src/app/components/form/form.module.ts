import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    HttpClientModule,
  ],
  exports: [
    FormComponent
  ],
  declarations: [
    FormComponent,
  ]
})
export class FormModule{
}
