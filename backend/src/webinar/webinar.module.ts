import { Module } from '@nestjs/common';
import { WebinarController } from './webinar.controller';
import { WebinarService } from './webinar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Webinar } from './webinar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Webinar])],
  controllers: [WebinarController],
  providers: [WebinarService]
})
export class WebinarModule {}
