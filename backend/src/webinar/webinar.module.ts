import { Module } from '@nestjs/common';
import { WebinarController } from './webinar.controller';
import { WebinarService } from './webinar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Webinar } from './webinar.entity';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../common/role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Webinar]), AuthModule],
  controllers: [WebinarController],
  providers: [WebinarService, RolesGuard]
})
export class WebinarModule {}
