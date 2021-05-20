import { NgModule } from '@angular/core';
import {NavbarComponent} from './navbar.component';
import {CommonModule} from '@angular/common';
import {SvgModule} from '../../../svg/svg.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent
  ],
    imports: [
        CommonModule,
        SvgModule,
        RouterModule
    ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule{
}
