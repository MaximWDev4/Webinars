import { Injectable } from '@angular/core';
import { WebinarServiceClient} from '../proto/webinar_pb_service';
import { WebinarRequest, WebinarResponse } from '../proto/webinar_pb';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  client: WebinarServiceClient;  constructor() {
    this.client = new WebinarServiceClient('http://localhost:3001');
  }  getHero(path, val): Promise <WebinarResponse> {
    return new Promise((resolve, reject) => {
      const req = new WebinarRequest();
      req.setName(val);
      this.client.requestWebinar(req, null, (err, response: WebinarResponse) => {
        if (err) {
          return reject(err);
        }
        resolve(response);
      });
    });
  }
}
