import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', pathMatch: 'full',  redirectTo: 'home'},
  {path: 'home/:id', loadChildren: () => import('./views/home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'webinar/:id', loadChildren: () => import('./views/webinar-room/webinar-room.module').then(m => m.WebinarRoomModule)},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
