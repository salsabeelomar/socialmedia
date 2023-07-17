import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { CommentController } from './comment/comment.controller';
import { UserController } from './user/user.controller';
import { CommentService } from './comment/comment.service';
import { UserService } from './user/user.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AppController,
    AuthController,
    PostController,
    CommentController,
    UserController,
  ],
  providers: [AppService],
})
export class AppModule {}
