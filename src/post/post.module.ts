import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { portProvider } from './post.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PostService } from './post.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [...portProvider, PostService],
})
export class PostModule {}
