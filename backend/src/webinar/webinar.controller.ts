import { Controller, Get } from '@nestjs/common';
import { WebinarService } from './webinar.service';

@Controller('webinar')
export class WebinarController {
  constructor(private webinarService: WebinarService) {}
  @Get()
  async getWebinars() {
    return this.webinarService.getWebinars();
  }
}
