import { Module } from '@nestjs/common';
import { RegistrationsService } from './services/registrations.service';
import { RegistrationsResolver } from './registrations.resolver';

@Module({
  providers: [RegistrationsResolver, RegistrationsService],
})
export class RegistrationsModule {}
