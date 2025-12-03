import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DatabaseModule } from 'src/database/prisma.module';
import { RegistrationsModule } from 'src/registrations/registrations.module';
import { repositoryProvider } from './providers/repository.provider';
import { serviceProvider } from './providers/service.provider';
import { EventsRepository } from './events.repository';

@Module({
  imports: [DatabaseModule, RegistrationsModule],
  providers: [
    EventsService,
    repositoryProvider,
    serviceProvider,
    EventsRepository
  ],
  controllers: [EventsController]
})
export class EventsModule {}
