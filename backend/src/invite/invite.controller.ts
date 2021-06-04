import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
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

  @Post('registered')
  async guestRegistered(@Body() guest: {id: number, email: string}): Promise<any> {
    if (guest.email && guest.id) {
      try {
        const data = await this.inviteService.findRegisteredUser({ email: guest.email, webinarId: guest.id });
        if (data) {
          return new ResponseSuccess('INVITE.FIND_SUCCESS', data);
        } else {
          return new ResponseError('INVITE.FIND_ERROR', { error: 404, message: 'invite not found' });
        }
      } catch (e) {
        return new ResponseError('INVITE.FIND_ERROR', e);
      }
    } else {
      throw new HttpException("Missing mandatory parameters", HttpStatus.FORBIDDEN)
    }
  }

}
