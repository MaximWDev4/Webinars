import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, mapTo, tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Tokens } from '../_models/tokens';
import { Common } from '../_helpers/common.helper';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  public lastError = '';
  public userName = '';
  public name = '';

  constructor(private http: HttpClient) {}


  loginUser(user: User): any {
    return this.http.post<any>(`${environment.apiUrl}/auth/email/login`,
      {userName: user.userName, password: user.password})
      .pipe(
        tap(data => {
          if (data.success) {
            this.storeuserName(data.userName);
            this.storeLicence(data.license);
            this.storeJwtToken(data.jwt);
            this.storeRefreshToken(data.refreshToken);
          }
        }),
      );
  }

  registerUser(regData: any): any {
    return this.http.post<any>(`${environment.apiUrl}/auth/email/register`,
      { userName: regData.userName.value, email: regData.email, password: regData.password.value }).pipe(
      map(data => data)
    );
  }

  resetPassword(regData: any): any {
    return this.http.post<any>(`${environment.apiUrl}/auth/password-reset`,
      { userName: regData.userName.value}).pipe(
      map(data => data)
    );
  }

  // getUserDetails(): any {
  //   return this.http.get<any>(`${environment.apiUrl}/auth/details`)
  //     .pipe(map(userObj => {
  //       return userObj;
  //     }));
  // }

  getUserLicence(): any {
    return localStorage.getItem('licence');
  }

  doLoginUser(tokens: Tokens): any {
    this.storeTokens(tokens);
  }

  isLoggedIn(): boolean {
    const jwt = this.getJwtToken();
    return !Common.isEmpty(jwt);
  }

  hasProfile(): any {
    const hasProfile = localStorage.getItem('hasProfile');
    if (!Common.isEmpty(hasProfile)) {
      return JSON.parse(hasProfile);
    }
    return false;
  }

  refreshToken(): any {
    return this.http.post<any>(`${environment.apiUrl}/token/refresh`, {refreshToken: this.getRefreshToken()})
      .pipe(tap((tokens: Tokens) => {
        this.storeJwtToken(tokens.jwt);
      }));
  }

  getJwtToken(): any {
    const jwt = localStorage.getItem(this.JWT_TOKEN);
    if (!Common.isEmpty(jwt)) {
      const parts = jwt.split('.');
      const jsonPayload = this.urlSafeBase64Decode(parts[1]);
      const payload = JSON.parse(jsonPayload);
      this.userName = payload.userName;
      this.name = payload.name;
    }
    return jwt;
  }

  urlSafeBase64Decode(input: string): any {
    const remainder = input.length % 4;
    if (remainder) {
      const padLength = 4 - remainder;
      input += '='.repeat(padLength);
    }
    return atob(input);
  }

  getRefreshToken(): any {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  storeJwtToken(jwt: string): any {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  storeRefreshToken(refreshToken: string): any {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  storeLicence(licence: any): any {
    localStorage.setItem('licence', licence);
  }

  storeuserName(userName: string): any {
    localStorage.setItem('userName', userName);
  }

  private storeTokens(tokens: Tokens): any {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens(): any {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  logoutUser(): any {
    this.name = '';
    this.userName = '';
    this.removeTokens();
    localStorage.removeItem('roles');
    localStorage.removeItem('userName');
    localStorage.removeItem('hasProfile');
  }
}
