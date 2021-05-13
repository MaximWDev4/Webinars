import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebinarModule } from './webinar/webinar.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { MetamorphosisModule } from '@fabio.formosa/metamorphosis-nest';

@Module({
  imports: [
    WebinarModule,
    CommentsModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    MetamorphosisModule.register({logger: true}),
    AuthModule,
  ],
})
export class AppModule {}
