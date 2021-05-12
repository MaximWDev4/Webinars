import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin.routing.module';
import {LoginComponent} from '../views/login/login.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {SideMenuItemComponent} from './side-menu/side-menu-item/side-menu-item.component';
import {CommonModule} from '@angular/common';
import {ScheduleWebinarComponent} from './admin-views/schedule-webinar/schedule-webinar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AllScheduledWebinarsComponent} from './admin-views/all-scheduled-webinars/all-scheduled-webinars.component';
import {SvgModule} from '../../svg/svg.module';
import {WebinarRowComponent} from './admin-views/all-scheduled-webinars/webinar-row/webinar-row.component';

@NgModule({
  declarations: [
    AdminComponent,
    SideMenuComponent,
    SideMenuItemComponent,
    ScheduleWebinarComponent,
    WebinarRowComponent,
    AllScheduledWebinarsComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SvgModule
  ],
  exports: [],
  providers: []
})
export class AdminModule {

}