import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WebinarService } from './webinar.service';

@Controller('webinar')
export class WebinarController {
  constructor(private webinarService: WebinarService) {}
  @Get()
  async getWebinars() {
    return this.webinarService.getWebinars();
  }
  @Get()
  async getWebinarById(@Param() id: string) {
      return this.webinarService.getWebinarById(id);
  }
  @Post('new')
  async createWebinar(@Body() body: {name: string, url: string, chatroomId: string}) {
    await this.webinarService.createNewWebinar(body);
    return 'success';
  }
  @Post('change')
  async changeWebinar(@Body() body: {id: number, name: string, url: string, chatroomId: string}) {
    await this.webinarService.changeWebinarById(body);
    return 'success'
  }
}
