import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { commentProvider } from './comment.providers';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentController],
  providers: [...commentProvider, CommentService],
})
export class CommentModule {}
