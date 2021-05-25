import { Module } from '@nestjs/common';
import { MessageGateway } from './comments.gateway';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [ TypeOrmModule.forFeature([Comment]), AuthModule],
  controllers: [],
  providers: [CommentsService, MessageGateway],
  exports: [TypeOrmModule]
})
export class CommentsModule {}
