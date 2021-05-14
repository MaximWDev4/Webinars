import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {LoginComponent} from './views/login/login.component';
import {
  RoleGuardService as RoleGuard
} from './_services/licence-guars.service';

const routes: Routes = [
  {path: '', pathMatch: 'full',  redirectTo: 'home'},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    // canActivate: [RoleGuard],
    // data: {
    //   expectedLicence: 5
    // },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./views/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'webinar/:id',
    // canActivate: [RoleGuard],
    // data: {
    //   expectedLicence: 0
    // },
    loadChildren: () => import('./views/webinar-room/webinar-room.module').then(m => m.WebinarRoomModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
