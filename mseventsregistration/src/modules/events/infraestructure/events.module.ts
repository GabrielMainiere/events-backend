import { forwardRef, Module } from '@nestjs/common'
import { EventsController } from './events.controller'
import { DatabaseModule } from 'src/modules/database/prisma.module'
import { RegistrationsModule } from 'src/modules/registrations/infraestructure/registrations.module'
import {
  EVENTS_REPOSITORY_TOKEN,
  eventsRepositoryProvider
} from './providers/events-repository.provider'
import { useCaseProviders } from './providers/usecase.provider'
import { EventsRepository } from './events.repository'
import { EventNotificationModule } from 'src/modules/notifications/event-notification/event-notification.module'

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => RegistrationsModule),
    EventNotificationModule
  ],
  providers: [eventsRepositoryProvider, ...useCaseProviders, EventsRepository],
  exports: [EVENTS_REPOSITORY_TOKEN],
  controllers: [EventsController]
})
export class EventsModule {}
