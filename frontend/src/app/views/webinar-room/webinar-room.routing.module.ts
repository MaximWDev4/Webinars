import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WebinarRoomComponent} from './webinar-room.component';


const routes: Routes = [
  {
    path: '',
    component: WebinarRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebinarRoomRoutingModule { }
