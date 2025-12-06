import { forwardRef, Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DatabaseModule } from 'src/modules/database/prisma.module';
import { RegistrationsModule } from 'src/modules/registrations/registrations.module';
import { repositoryProvider } from './providers/repository.provider';
import { serviceProvider } from './providers/service.provider';
import { EventsRepository } from './events.repository';

@Module({
  imports: [DatabaseModule, forwardRef(() => RegistrationsModule)],
  providers: [
    EventsService,
    repositoryProvider,
    serviceProvider,
    EventsRepository
  ],
  controllers: [EventsController],
  exports: [serviceProvider, EventsService]
})
export class EventsModule {}
