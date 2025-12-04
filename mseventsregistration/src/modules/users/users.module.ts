import { Module } from '@nestjs/common';
import { UsersClient } from './client/userClient';

@Module({
  providers: [UsersClient],
  exports: [UsersClient],
})
export class UsersModule {}
