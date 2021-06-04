import { Injectable} from '@angular/core';
import {Webinar} from '../_models/webinar';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class WebinarService {
  constructor(private http: HttpClient) {
  }

  HttpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };

  getWebinarById(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/webinar/byId?id=${id}`)
      .pipe(map(webinarObj => {
        return webinarObj;
      }));
  }

  getAllWebinars(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/webinar`).pipe(map(api => api));
  }

  newWebinar(data: {name: string, url: string, start_time: number, chatroomId: number}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/webinar/new`, data, this.HttpOptions).pipe(
      map(api => api));
  }

  changeWebinar(data: {id: number, name: string, url: string, chatroomId: number, start_time: number}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/webinar/change`, data, this.HttpOptions).pipe(
      map(api => api));
  }
  deleteWebinar(id: number): Observable<any>{
    return this.http.post(`${environment.apiUrl}/webinar/delete`, JSON.stringify({id}), this.HttpOptions).pipe(
      map(api => api));
  }
}
