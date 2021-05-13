import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import {default as config} from '../../config';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { UserDto } from '../users/dto/user.dto';
import { EmailVerification } from './email-ver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { getConnection, Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
              @InjectRepository(EmailVerification) private readonly emailVerificationRepo: Repository<EmailVerification>,
              // @InjectRepository('ForgottenPassword') private readonly forgottenPasswordModel: Repo<ForgottenPassword>,
              // @InjectRepository('ConsentRegistry') private readonly consentRegistryModel: Repo<ConsentRegistry>,
              private readonly jwtService: JWTService) {}


  async validateLogin(email, password) {
    const userFromDb = await this.userRepo.findOne({ email: email});
    if(!userFromDb) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    if(!userFromDb.emailVerified) throw new HttpException('LOGIN.EMAIL_NOT_VERIFIED', HttpStatus.FORBIDDEN);

    const isValidPass = await bcrypt.compare(password, userFromDb.password);

    if(isValidPass){
      const accessToken = await this.jwtService.createToken(email, userFromDb.licence);
      return { token: accessToken, user: new UserDto(userFromDb)}
    } else {
      throw new HttpException('LOGIN.ERROR', HttpStatus.UNAUTHORIZED);
    }

  }

  async createEmailVer(email: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationRepo.findOne({ email: email });
    if (!emailVerification) {
      return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(EmailVerification)
        .values([
          { email: email,
            emailToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(), //Generate 7 digits number
            timestamp: new Date() },
        ])
        .execute().then(async () => {
          return true
        });
    } else {
      throw new HttpException('LOGIN.EMAIL_ALREADY_QUEUED', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createEmailToken(email: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationRepo.findOne({ email: email });
    if (((new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 < 15)) {
      throw new HttpException('LOGIN.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      await this.emailVerificationRepo.update(
        { email: email },
        {
          email: email,
          emailToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(), //Generate 7 digits number
          timestamp: new Date()
        },
      );
      return true;
    }
  }

  // async saveUserConsent(email: string): Promise<ConsentRegistry> {
  //   try {
  //     const http = new HttpService();
  //
  //     const newConsent = new this.consentRegistryModel();
  //     newConsent.email = email;
  //     newConsent.date = new Date();
  //     newConsent.registrationForm = ["name", "surname", "email", "birthday date", "password"];
  //     newConsent.checkboxText = "I accept privacy policy";
  //     const privacyPolicyResponse: any = await http.get("https://www.XXXXXX.com/api/privacy-policy").toPromise()
  //     newConsent.privacyPolicy = privacyPolicyResponse.data.content;
  //     const cookiePolicyResponse: any = await http.get("https://www.XXXXXX.com/api/privacy-policy").toPromise()
  //     newConsent.cookiePolicy = cookiePolicyResponse.data.content;
  //     newConsent.acceptedPolicy = "Y";
  //     return await newConsent.save();
  //   } catch(error) {
  //     console.error(error)
  //   }
  // }

  // async createForgottenPasswordToken(email: string): Promise<ForgottenPassword> {
  //   var forgottenPassword= await this.forgottenPasswordModel.findOne({email: email});
  //   if (forgottenPassword && ( (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15 )){
  //     throw new HttpException('RESET_PASSWORD.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
  //   } else {
  //     var forgottenPasswordModel = await this.forgottenPasswordModel.findOneAndUpdate(
  //       {email: email},
  //       {
  //         email: email,
  //         newPasswordToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(), //Generate 7 digits number,
  //         timestamp: new Date()
  //       },
  //       {upsert: true, new: true}
  //     );
  //     if(forgottenPasswordModel){
  //       return forgottenPasswordModel;
  //     } else {
  //       throw new HttpException('LOGIN.ERROR.GENERIC_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
  //   }
  // }

  async verifyEmail(token: string): Promise<boolean> {
    const emailVerif = await this.emailVerificationRepo.findOne({ emailToken: token});
    if(emailVerif && emailVerif.email){
      const userFromDb = await this.userRepo.findOne({ email: emailVerif.email});
      if (userFromDb) {
        const savedUser = await this.userRepo.update({email: userFromDb.email}, {emailVerified: true});
        await this.emailVerificationRepo.remove(emailVerif);
        return !!savedUser;
      }
    } else {
      throw new HttpException('LOGIN.EMAIL_CODE_NOT_VALID', HttpStatus.FORBIDDEN);
    }
  }

  // async getForgottenPasswordModel(newPasswordToken: string): Promise<ForgottenPassword> {
  //   return await this.forgottenPasswordModel.findOne({newPasswordToken: newPasswordToken});
  // }

  async sendEmailVerification(email: string): Promise<boolean> {
    const Repo = await this.emailVerificationRepo.findOne({ email: email});

    if(Repo && Repo.emailToken){
      const transporter = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        secure: config.mail.secure, // true for 465, false for other ports
        auth: {
          user: config.mail.user,
          pass: config.mail.pass
        }
      });

      const mailOptions = {
        from: '"Company" <' + config.mail.user + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Verify Email',
        text: 'Verify Email',
        html: 'Hi! <br><br> Thanks for your registration<br><br>'+
          '<a href='+ config.host.url + ':' + config.host.port +'/auth/email/verify/'+ Repo.emailToken + '>Click here to activate your account</a>'  // html body
      };

      const sent = await new Promise<boolean>(async function(resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        });
      })

      return sent;
    } else {
      throw new HttpException('LOGIN.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    }
  }

  async checkPassword(email: string, password: string){
    const userFromDb = await this.userRepo.findOne({ email: email});
    if(!userFromDb) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    return await bcrypt.compare(password, userFromDb.password);
  }

  // async sendEmailForgotPassword(email: string): Promise<boolean> {
  //   var userFromDb = await this.userModel.findOne({ email: email});
  //   if(!userFromDb) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
  //
  //   var tokenModel = await this.createForgottenPasswordToken(email);
  //
  //   if(tokenModel && tokenModel.newPasswordToken){
  //     let transporter = nodemailer.createTransport({
  //       host: config.mail.host,
  //       port: config.mail.port,
  //       secure: config.mail.secure, // true for 465, false for other ports
  //       auth: {
  //         user: config.mail.user,
  //         pass: config.mail.pass
  //       }
  //     });
  //
  //     let mailOptions = {
  //       from: '"Company" <' + config.mail.user + '>',
  //       to: email, // list of receivers (separated by ,)
  //       subject: 'Frogotten Password',
  //       text: 'Forgot Password',
  //       html: 'Hi! <br><br> If you requested to reset your password<br><br>'+
  //         '<a href='+ config.host.url + ':' + config.host.port +'/auth/email/reset-password/'+ tokenModel.newPasswordToken + '>Click here</a>'  // html body
  //     };
  //
  //     var sended = await new Promise<boolean>(async function(resolve, reject) {
  //       return await transporter.sendMail(mailOptions, async (error, info) => {
  //         if (error) {
  //           console.log('Message sent: %s', error);
  //           return reject(false);
  //         }
  //         console.log('Message sent: %s', info.messageId);
  //         resolve(true);
  //       });
  //     })
  //
  //     return sended;
  //   } else {
  //     throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
  //   }
  // }

}
