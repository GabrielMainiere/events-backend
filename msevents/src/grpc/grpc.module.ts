import { Module } from '@nestjs/common';
import { EventRegistrationClient } from './proto/clients/eventRegistrationClient';

@Module({
  providers: [EventRegistrationClient],
  exports: [EventRegistrationClient],
})
export class GrpcModule {}
