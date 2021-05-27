import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {InfoService} from '../_services/info.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService,
    private infoService: InfoService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    if (this.authService.isLoggedIn() ) {
        return true;
    }
    this.infoService.infoChange('У вас не достаточно прав для доступа к этому url');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.authService.isLoggedIn() ) {
        return true;
    }
    this.infoService.infoChange('У вас не достаточно прав для доступа к этому url');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
