import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {LoginComponent} from './views/login/login.component';
import {
  RoleGuardService as RoleGuard
} from './_services/licence-guars.service';
import {SignUpComponent} from './views/sign-up/sign-up.component';
import {ConformEmailComponent} from './views/conform-email/conform-email.component';
import {WebinarGuestAuthComponent} from './views/webinar-guest-auth/webinar-guest-auth.component';

const routes: Routes = [
  {path: '', pathMatch: 'full',  redirectTo: 'home/0'},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'email-ver/:email/:returnUrl',
    component: ConformEmailComponent
  },
  {
    path: 'admin',
    canActivate: [RoleGuard],
    data: {
      expectedLicence: 5
    },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./views/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'webinar/:id',
    canActivate: [RoleGuard],
    data: {
      expectedLicence: 0
    },
    loadChildren: () => import('./views/webinar-room/webinar-room.module').then(m => m.WebinarRoomModule)
  },
  {
    path: 'webinar/:id/:email/:username',
    component: WebinarGuestAuthComponent,
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', paramsInheritanceStrategy: 'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
