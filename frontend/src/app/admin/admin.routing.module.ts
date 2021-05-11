import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {RoutingMap} from './routing-map';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: RoutingMap.scheduleWebinar.routeName,
        component: RoutingMap.scheduleWebinar.child,
      },
      {
        path: RoutingMap.allScheduledWebinars.routeName,
        component: RoutingMap.allScheduledWebinars.child,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
