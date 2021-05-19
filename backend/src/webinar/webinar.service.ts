import { Injectable } from '@nestjs/common';
import { Webinars } from './webinar.mock';

@Injectable()
export class WebinarService {
  webinars = Webinars;
  public async getWebinars() {
    return this.webinars;
  }

  getWebinarById(id: string) {
    return Promise.resolve(id);
  }

  async createNewWebinar(body: { name: string; url: string; chatroomId: string }) {
    return body;
  }

  async changeWebinarById(body: { id: number; name: string; url: string; chatroomId: string }) {
    return body;
  }
}
