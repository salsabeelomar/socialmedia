import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ResponseInterceptor } from './common/interceptor/Response.interceptor';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { INTERCEPTOR } from './common/constant';
import config from 'config/index';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [config[0]],
      isGlobal: true,
    }),
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: INTERCEPTOR.RESPONSE,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
