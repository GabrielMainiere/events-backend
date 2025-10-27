import { Module } from '@nestjs/common';
import { EventRegistrationClient } from './clients/eventRegistrationClient';

@Module({
  providers: [EventRegistrationClient],
  exports: [EventRegistrationClient],
})
export class GrpcModule {}
