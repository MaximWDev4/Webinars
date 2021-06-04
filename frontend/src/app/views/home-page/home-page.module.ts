import { NgModule } from '@angular/core';
import {HomePageComponent} from './home-page.component';
import {HttpClientModule} from '@angular/common/http';
import {WEBINAR_PROVIDERS} from './home-page.providers';
import {WebinarService} from '../../_services/webinar.service';

import {SearchService} from '../../_services/search.service';
import {CommonModule} from '@angular/common';
import {HomePageRoutingModule} from './home-page.routing.module';
import {SliderModule} from '../../components/slider/slider-module';
import {NavbarModule} from '../../components/navbar/navbar.module';
import {FormModule} from '../../components/form/form.module';
import {SpikerModule} from '../../components/spiker/spiker.module';
import {ProfitModule} from '../../components/profit/profit.module';
import {ProgrammModule} from '../../components/programm/programm.module';
import {DropdownItemModule} from '../../components/dropdown-item/dropdown-item.module';

@NgModule({
  imports: [
    CommonModule,
    SliderModule,
    NavbarModule,
    SpikerModule,
    FormModule,
    ProfitModule,
    ProgrammModule,
    HttpClientModule,
    HomePageRoutingModule,
    DropdownItemModule,
  ],
   declarations: [
     HomePageComponent,
   ],
  providers: [
    WEBINAR_PROVIDERS,
    SearchService,
    WebinarService,
   ]
})
export class HomePageModule{
}
