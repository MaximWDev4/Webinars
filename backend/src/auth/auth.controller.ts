import { Controller, Post, HttpStatus, HttpCode, Get, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseSuccess, ResponseError } from '../common/response.dto';
import { IResponse } from '../common/response.interface';
// import { CreateUserDto } from '../users/dto/create-user.dto';
// import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { CreateUserDto } from '../users/dto/create-users.dto';
import { User } from '../users/user.entity';
import { RefreshToken } from './refreshToken.entity';
// import { ResetPasswordDto } from './dto/reset-password.dto';

export class Login {
  readonly email: string;
  readonly password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService ) {}

  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() login: Login): Promise<IResponse> {
    try {
      const response = await this.authService.validateLogin(login.email, login.password);
      return new ResponseSuccess("LOGIN.SUCCESS", response);
    } catch(error) {
      return new ResponseError("LOGIN.ERROR", error);
    }
  }

  @Post('token/refresh')
  @HttpCode(HttpStatus.OK)
  public async refresh(@Body() token: RefreshToken): Promise<IResponse> {
    try {
      const response = await this.authService.refreshToken(token.token, token.email);
      return new ResponseSuccess("REFRESH.SUCCESS", response);
    } catch(error) {
      return new ResponseError("REFRESH.ERROR", error);
    }
  }

  @Post('email/register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    try {
      this.userService.createNewUser(createUserDto).then(async (newUser: User) => {

        const sent = await this.authService.createEmailVer(newUser.email).then(async () => {
          return await this.authService.sendEmailVerification(newUser.email).catch((e) => {throw e});
        }).catch((e) => {throw e});
        if (sent) {
          return new ResponseSuccess("REGISTRATION.USER_REGISTERED_SUCCESSFULLY");
        } else {
          return new ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
        }
      }).catch((e) => {throw e});
    }
    catch(error){
      return new ResponseError("REGISTRATION.ERROR.GENERIC_ERROR", error);
    }
  }

  @Get('email/verify/:token')
  public async verifyEmail(@Param() params): Promise<IResponse> {
    try {
      const isEmailVerified = await this.authService.verifyEmail(params.token);
      return new ResponseSuccess("LOGIN.EMAIL_VERIFIED", isEmailVerified);
    } catch(error) {
      return new ResponseError("LOGIN.ERROR", error);
    }
  }

  @Get('email/resend-verification/:email')
  public async sendEmailVerification(@Param() params): Promise<IResponse> {
    try {
      await this.authService.createEmailToken(params.email);
      const isEmailSent = await this.authService.sendEmailVerification(params.email);
      if(isEmailSent){
        return new ResponseSuccess("LOGIN.EMAIL_RESENT", null);
      } else {
        return new ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
      }
    } catch(error) {
      return new ResponseError("LOGIN.ERROR.SEND_EMAIL", error);
    }
  }


  // @Post('email/reset-password')
  // @HttpCode(HttpStatus.OK)
  // public async setNewPassord(@Body() resetPassword: ResetPasswordDto): Promise<IResponse> {
  //   try {
  //     var isNewPasswordChanged : boolean = false;
  //     if(resetPassword.email && resetPassword.currentPassword){
  //       var isValidPassword = await this.authService.checkPassword(resetPassword.email, resetPassword.currentPassword);
  //       if(isValidPassword) {
  //         isNewPasswordChanged = await this.userService.setPassword(resetPassword.email, resetPassword.newPassword);
  //       } else {
  //         return new ResponseError("RESET_PASSWORD.WRONG_CURRENT_PASSWORD");
  //       }
  //     } else if (resetPassword.newPasswordToken) {
  //       var forgottenPasswordModel = await this.authService.getForgottenPasswordModel(resetPassword.newPasswordToken);
  //       isNewPasswordChanged = await this.userService.setPassword(forgottenPasswordModel.email, resetPassword.newPassword);
  //       if(isNewPasswordChanged) await forgottenPasswordModel.remove();
  //     } else {
  //       return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR");
  //     }
  //     return new ResponseSuccess("RESET_PASSWORD.PASSWORD_CHANGED", isNewPasswordChanged);
  //   } catch(error) {
  //     return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR", error);
  //   }
  // }

}
