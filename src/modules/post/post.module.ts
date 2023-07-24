import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { postProvider } from './post.providers';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PostService } from './post.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { UserService } from 'src/modules/user/user.service';
import { userProvider } from 'src/modules/user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [
    ...postProvider,
    ...userProvider,
    UserService,
    PostService,
    AuthGuard,
  ],
})
export class PostModule {}
