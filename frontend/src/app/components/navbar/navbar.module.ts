import { NgModule } from '@angular/core';
import {NavbarComponent} from './navbar.component';
import {CommonModule} from '@angular/common';
import {SvgModule} from '../../../svg/svg.module';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SvgModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule{
}
