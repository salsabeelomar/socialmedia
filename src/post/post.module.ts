import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { portProvider } from './post.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { userProvider } from 'src/user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [
    ...portProvider,
    ...userProvider,
    UserService,
    PostService,
    AuthGuard,
  ],
})
export class PostModule {}
