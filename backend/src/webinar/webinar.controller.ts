import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WebinarService } from './webinar.service';
import { ResponseError, ResponseSuccess } from '../common/response.dto';

@Controller('webinar')
export class WebinarController {
  constructor(private webinarService: WebinarService) {}
  @Get()
  async getWebinars() {
    try {
      const data = await this.webinarService.getWebinars();
      return new ResponseSuccess('WEBINAR.SUCCESS', data)
    } catch (e) {
      return new ResponseError( 'WEBINAR.ERROR', e)
    }

  }
  @Get('byId')
  async getWebinarById(@Query() id: number) {
    try {
      const data = await this.webinarService.getWebinarById(id);
      return new ResponseSuccess('WEBINAR.BY_ID_SUCCESS', data)
    } catch (e) {
      return new ResponseError( 'WEBINAR.BY_ID_ERROR', e)
    }

  }
  @Post('new')
  async createWebinar(@Body() body: {name: string, url: string, chatroomId: number}) {
    try {
      await this.webinarService.createNewWebinar(body);
      return new ResponseSuccess('WEBINAR.CREATE_SUCCESS')
    } catch (e) {
      return new ResponseError( 'WEBINAR.CREATE_ERROR', e)
    }
  }
  @Post('change')
  async changeWebinar(@Body() body: {id: number, name: string, url: string, chatroomId: number}) {
    try {
      await this.webinarService.changeWebinarById(body);
      return new ResponseSuccess('WEBINAR.CHANGE_SUCCESS')
    } catch (e) {
     return new ResponseError( 'WEBINAR.CHANGE_ERROR', e)
    }
  }

  @Post('delete')
  async deleteWebinar(@Body() body: {id: number,}) {
    try {
      await this.webinarService.deleteWebinarById(body.id);
      return new ResponseSuccess('WEBINAR.DELETE_SUCCESS')
    } catch (e) {
      return new ResponseError( 'WEBINAR.DELETE_ERROR', e)
    }
  }

}
