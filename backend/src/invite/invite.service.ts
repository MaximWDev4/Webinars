import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Cron } from '@nestjs/schedule';
import { getConnection, Repository } from 'typeorm';
import { Invite } from './invite.entity';
import { Webinar } from '../webinar/webinar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { default as config } from '../../config';
import { JWTService } from '../auth/jwt.service';

@Injectable()
export class InviteService {

  constructor(
    @InjectRepository(Webinar) private  webinarRepo: Repository<Webinar>,
    @InjectRepository(Invite) private  inviteRepo: Repository<Invite>
  ) {}

  private readonly logger = new Logger(InviteService.name);

  @Cron('00 10 12 * * *')
  async handleCron() {
    this.logger.debug('Called when the cron planned');
    const webinars = await getConnection()
      .createQueryBuilder()
      .select("webinar")
      .from(Webinar, "webinar")
      .where("webinar.start_time - :now < 86400000", { now: Date.now() })
      .getMany();
    webinars.forEach((webinar) => {
        if (webinar.invited) {
          webinar.invited.forEach((invite) => {
            this.sendInvite({
              webinar: { id: webinar.id, start_time: webinar.start_time, name: webinar.name },
              email: invite.email,
              userName: invite.userName
            });
          })
        }
      }
    )
  }

  async addUserToSpam(user: {email: string, userName: string, webinarId: number}): Promise<any> {
    let webinar: Webinar ;
    try {
      webinar = await this.webinarRepo.findOne({ id: user.webinarId });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
      if (webinar) {
        try {
          await this.sendInvite({ webinar: { id: user.webinarId, name: webinar.name, start_time: webinar.start_time}, userName: user.userName, email: user.email });
          return await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Invite)
            .values([{
              email: user.email,
              userName: user.userName,
              webinar: webinar
            },])
            .execute();
        } catch (e) {
          throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } else {
        throw new HttpException('Webinar not found', HttpStatus.NOT_FOUND);
      }
  }

  async findRegisteredUser(body: {email: string, webinarId: number}) {
      let webinar: Webinar;
      try {
        webinar = await this.webinarRepo.findOne({ id: +body.webinarId });
      } catch (e) {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      try {
        const guest = this.inviteRepo.findOne( {email: body.email, webinar: webinar});
        if (guest) {
          return guest;
        }
        {
          return new HttpException('guest not found', HttpStatus.NOT_FOUND);
        }
      } catch (e) {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
      }
  }

  async sendInvite(user: {email: string, userName: string, webinar: { id: number, name: string, start_time: number}}): Promise<boolean> {
    const email = user.email;
    const userName = user.userName;
    const webinar = user.webinar;
    const webinarName = user.webinar.name;
    const startTime = user.webinar.start_time;
      const transporter = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        secure: config.mail.secure, // true for 465, false for other ports
        auth: {
          user: config.mail.user,
          pass: config.mail.pass
        }
      });

      try {
        const url = 'https://event-manager.club/webinar/'+ webinar.id.toString() + '/' + encodeURIComponent(email.toString()) + '/' + encodeURIComponent(userName.toString());
        const mailOptions = {
        from: '"Lstovka\'s event school" <' + config.mail.user + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Invite',
        text: 'Приглошение на бесплатный ознакомительный вебинар',
        html: 'Здравствуйте ' + userName +'! <br><br> Спасибо за регистрацию на вебинар "'+ webinarName.toString() +'"<br><br>' +
          'трансляция начнется '+ this.timeConverter(webinar.start_time) + '<br>' +
          '<br> Ваша ссылка для присоединения: <br><br>' +
          '<b>' + '<a href="' + url +'">' + url + '</a>'// html body
      };

      return  await new Promise<boolean>(async function(resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        });
      })
    } catch (e) {
      throw new HttpException('CRON.INVITE_FAILED', e);
    }
  }

  timeConverter(UNIX_timestamp: number){
    const a = new Date(+UNIX_timestamp + 21600000);
    const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
    const year = a.getUTCFullYear();
    const month = months[a.getUTCMonth()];
    const date = a.getUTCDay();
    const hour = a.getUTCHours();
    const min = a.getUTCMinutes();
    return date + ' ' + month + ' ' + year + 'г. в ' + ('0'+hour).slice(-2) + ':' + ('0'+min).slice(-2) + ' по Алматинскому времени (UTC + 6)' ;
  }
}
