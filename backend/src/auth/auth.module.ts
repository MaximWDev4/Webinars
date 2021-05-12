import {
  Module, MiddlewareConsumer, NestModule
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
// import { EmailVerificationSchema } from '../auth/schemas/emailverification.schema';
// import { ForgottenPasswordSchema } from './schemas/forgottenpassword.schema';
// import { ConsentRegistrySchema } from './schemas/consentregistry.schema';
import { UsersService } from '../users/users.service';
import { JWTService } from './jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JWTService, JwtStrategy],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(AuthController);
  }
}
