import { Body, Controller, Post } from '@nestjs/common';
import { InviteService } from './invite.service';
import { ResponseError, ResponseSuccess } from '../common/response.dto';

@Controller('invite')
export class InviteController {

  constructor(private inviteService: InviteService) {
  }

  @Post('new')
  async inviteNewUser(@Body() body: {email: string, userName: string, webinarId: number} ) {
    try {
      const data = await this.inviteService.addUserToSpam(body);
      return new ResponseSuccess('INVITE.SUCCESS', data);
    } catch (e) {
      return new ResponseError('INVITE.ERROR', e);
    }
  }

}
