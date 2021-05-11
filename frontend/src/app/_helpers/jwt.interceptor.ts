import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor  {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) { }
// Observable<HttpEvent<any>>
  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    if (this.authService.isLoggedIn()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof  HttpErrorResponse && 401 === error.status) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string): any {
    return request.clone({
      setHeaders: {
        'X-API-Key': `Obstacle ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
