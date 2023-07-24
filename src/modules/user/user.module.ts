import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userProvider } from './user.providers';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProvider, UserService],
})
export class UserModule {}
