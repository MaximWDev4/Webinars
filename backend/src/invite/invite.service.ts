import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { getConnection, Repository } from 'typeorm';
import { Invite } from './invite.entity';
import { Webinar } from '../webinar/webinar.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InviteService {

  constructor(@InjectRepository(Webinar) private  webinarRepo: Repository<Webinar>) {}

  private readonly logger = new Logger(InviteService.name);

  @Cron('* 10 * * * *')
  handleCron() {
    this.logger.debug('Called when the current minute is 10');
  }

  async addUserToSpam(user: {email: string, userName: string, webinarId: number}): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Invite)
      .values([{
        email: user.email,
        userName: user.userName,
        webinar: await this.webinarRepo.findOne({id: user.webinarId})
      },])
      .execute();
  }

  async sendInvites(): Promise<void> {

  }
}
