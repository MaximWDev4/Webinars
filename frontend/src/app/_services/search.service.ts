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
  sendPotentialListener(data) {
      return this.http.post(`${environment.apiUrl}/webinarguest/`, data, this.HttpOptions).pipe(
        map(api => api));
  }
}


