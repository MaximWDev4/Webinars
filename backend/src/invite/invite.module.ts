import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invite } from './invite.entity';
import { Webinar } from '../webinar/webinar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invite, Webinar])],
  controllers: [InviteController],
  providers: [InviteService]
})
export class InviteModule {}
