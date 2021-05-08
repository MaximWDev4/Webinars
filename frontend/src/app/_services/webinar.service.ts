import { Injectable} from '@angular/core';
import {Webinar} from '../_models/webinar';
import {Observable} from 'rxjs';

@Injectable()
export class WebinarService {
  constructor() {
  }

  getWebinarByName$(Id): Observable<Webinar>{
      return Id.subscribe(id => ({name: id}));
  }

}
