import { forwardRef, Module } from '@nestjs/common'
import { EventsController } from './events.controller'
import { DatabaseModule } from 'src/modules/database/prisma.module'
import { RegistrationsModule } from 'src/modules/registrations/infraestructure/registrations.module'
import { eventsRepositoryProvider } from './providers/events-repository.provider'
import { useCaseProviders } from './providers/usecase.provider'
import { EventsRepository } from './events.repository'

@Module({
  imports: [DatabaseModule, forwardRef(() => RegistrationsModule)],
  providers: [eventsRepositoryProvider, ...useCaseProviders, EventsRepository],
  controllers: [EventsController]
})
export class EventsModule {}
