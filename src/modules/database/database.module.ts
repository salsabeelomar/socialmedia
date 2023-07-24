import { Module } from '@nestjs/common';
import { databaseProvider } from './database.providers';
import { DATABASE_CONSTANT } from 'src/common/constant';

@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider, DATABASE_CONSTANT.DATABASE_PROVIDE],
})
export class DatabaseModule {}
