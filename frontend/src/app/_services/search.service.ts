import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class SearchService {
  HttpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };
  constructor(private http: HttpClient) {
  }
  // tslint:disable-next-line:typedef
  sendPotentialListener(data: {email: string, userName: string, webinarId: number}) {
      return this.http.post(`${environment.apiUrl}/invite/new`, data, this.HttpOptions).pipe(
        map(api => api));
  }
}


