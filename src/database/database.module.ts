import { Module } from '@nestjs/common';
import { databaseProvider } from './database.providers';

@Module({
  imports: [],
  providers: [...databaseProvider],
})
export class DatabaseModule {}
