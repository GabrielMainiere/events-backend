import { Module } from '@nestjs/common';
import { EventsResolver } from '../adapters/graphql/events.resolver';
import { EventRepository } from '../adapters/database/events.repository.adapter';
import 'src/core/enum/registerEnums';
import { EventNotifier } from '../adapters/notifications/eventsNotifier.adapter';
import { ProducerModule } from 'src/modules/events/infrastructure/adapters/messaging/producer.module';
import { CancelEventUseCase } from '../../application/use-cases/cancel-event.usecase';
import { CreateEventUseCase } from '../../application/use-cases/create-event.usecase';
import { UpdateEventUseCase } from '../../application/use-cases/update-event.usecase';
import { GetEventUseCase } from '../../application/use-cases/get-event-by-id.usecase';
import { FindAllEventsUseCase } from '../../application/use-cases/findAll-event.usecase';

@Module({
  imports: [
    ProducerModule,
  ],
  providers: [
    EventsResolver,
    CancelEventUseCase,
    CreateEventUseCase,
    UpdateEventUseCase,
    GetEventUseCase,
    FindAllEventsUseCase,
    {
      provide: 'IEventRepository',
      useClass: EventRepository,
    },
    {
      provide: 'IEventNotifier',
      useClass: EventNotifier,
    },
  ],
  exports: [CancelEventUseCase, CreateEventUseCase, UpdateEventUseCase, GetEventUseCase, FindAllEventsUseCase],
})
export class EventsModule {}
