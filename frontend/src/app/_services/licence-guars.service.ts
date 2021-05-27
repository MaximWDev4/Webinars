import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import {InfoService} from './info.service';

@Injectable()
export class RoleGuardService implements CanActivate, CanActivateChild {
  constructor(public auth: AuthService, public router: Router,
              private infoService: InfoService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    // this will be passed from the route config
    // on the data property
    const expectedLicence = route.data.expectedLicence;
    const jwt = localStorage.getItem('JWT_TOKEN');    // decode the token to get its payload
    if (this.auth.isLoggedIn()) {
      const payload: any = jwt_decode(jwt, {header: false});
      if (payload.licence >= expectedLicence) {
        return true;
      }
      this.infoService.infoChange('У вас не достаточно прав для доступа к этому url');
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    this.infoService.infoChange('Для доступа к этому url необходимо войти в аккаунт');
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    // this will be passed from the route config
    // on the data property
    const expectedLicence = route.data.expectedLicence;
    const token = localStorage.getItem('token');    // decode the token to get its payload
    if (this.auth.isLoggedIn()) {
      const tokenPayload: any = decode(token);
      if (tokenPayload.licence > expectedLicence) {
        return true;
      }
      this.infoService.infoChange('У вас не достаточно прав для доступа к этому url');
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    this.infoService.infoChange('Для доступа к этому url необходимо войти в аккаунт');
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
