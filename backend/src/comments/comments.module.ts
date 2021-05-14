import { Module } from '@nestjs/common';
import { CommentsGateway } from './comments.gateway';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsGateway],
  providers: [CommentsService, CommentsGateway],
  exports: [TypeOrmModule]
})
export class CommentsModule {}
