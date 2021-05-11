import { Injectable } from '@nestjs/common';
import { Webinars } from './webinar.mock';

@Injectable()
export class WebinarService {
  webinars = Webinars;
  public async  getWebinars() {

    return this.webinars;
  }

}
