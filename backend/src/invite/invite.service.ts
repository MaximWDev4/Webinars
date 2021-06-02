import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Cron } from '@nestjs/schedule';
import { getConnection, Repository } from 'typeorm';
import { Invite } from './invite.entity';
import { Webinar } from '../webinar/webinar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { default as config } from '../../config';

@Injectable()
export class InviteService {

  constructor(
    @InjectRepository(Webinar) private  webinarRepo: Repository<Webinar>,
    @InjectRepository(Invite) private  inviteRepo: Repository<Invite>
  ) {}

  private readonly logger = new Logger(InviteService.name);

  @Cron('00 10 12 * * *')
  async handleCron() {
    this.logger.debug('Called when the current minute is 10');
    const webinars = await getConnection()
      .createQueryBuilder()
      .select("webinar")
      .from(Webinar, "webinar")
      .where("webinar.start_time - :now < 8640000", { now: Date.now() })
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
    const webinar = await this.webinarRepo.findOne({id: user.webinarId});
    await this.sendInvite({webinar: webinar, userName: user.userName, email: user.email});
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
        const mailOptions = {
        from: '"Lstovka\'s event school" <' + config.mail.user + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Invite',
        text: 'Приглошение на бесплатный ознакомительный вебинар',
        html: 'Здравствуйте' + userName +'! <br><br> Спасибо за регистрацию на вебинар "'+ webinarName.toString() +'"<br><br>' +
          'трансляция начнется '+ this.timeConverter(webinar.start_time) + '<br>' +
          '<br> Ваша ссылка для присоединения: <br><br>' +
          '<b>' + '<a href="event-manager.club/webinar/'+ webinar.toString() + '/' + email.toString() + '/' + userName.toString() +'">ссылка</a>'// html body
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

  timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    return date + ' ' + month + ' ' + year + 'г. в' + hour + ':' + min ;
  }
}
