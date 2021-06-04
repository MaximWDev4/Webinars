import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  HttpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };

  getUserById(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/byId?id=${id}`)
      .pipe(map(userObj => {
        return userObj;
      }));
  }

  guestCheck(body: {id: number, email: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/invite/registered`, body, )
      .pipe(map(response => response));
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/all`).pipe(map(api => api));
  }

  changeUser(data: {id: number, email: string,  licence: number, userName: string}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/change`, data, this.HttpOptions).pipe(
      map(api => api));
  }

  deleteUser(id: number): Observable<any>{
    return this.http.post(`${environment.apiUrl}/users/delete`, JSON.stringify({id}), this.HttpOptions).pipe(
      map(api => api));
  }
}
