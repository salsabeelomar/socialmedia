import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ResponseInterceptor } from './app.interceptor';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, PostModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'RESPONSE_INTERCEPTOR',
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
