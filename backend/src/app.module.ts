import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebinarModule } from './webinar/webinar.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { MetamorphosisModule } from '@fabio.formosa/metamorphosis-nest';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './common/role.guard';
import { InviteModule } from './invite/invite.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    WebinarModule,
    CommentsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    MetamorphosisModule.register({logger: true}),
    ScheduleModule.forRoot(),
    AuthModule,
    InviteModule,
  ],
  providers: [
    RolesGuard,
  ]
})
export class AppModule {}
