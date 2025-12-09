import { Module } from '@nestjs/common';
import { EventsResolver } from '../adapters/in/graphql/events.resolver';
import { EventRepository } from '../adapters/out/database/events.repository.adapter';
import 'src/core/enum/registerEnums';
import { EventNotifier } from '../adapters/out/notifications/eventsNotifier.adapter';
import { ProducerModule } from '../adapters/out/messaging/producer.module';
import { CancelEventUseCase } from '../../application/use-cases/cancel-event.usecase';
import { CreateEventUseCase } from '../../application/use-cases/create-event.usecase';
import { UpdateEventUseCase } from '../../application/use-cases/update-event.usecase';
import { GetEventUseCase } from '../../application/use-cases/get-event-by-id.usecase';
import { FindAllEventsUseCase } from '../../application/use-cases/findAll-event.usecase';

@Module({
  imports: [ProducerModule],

  providers: [
    EventsResolver,
    {
      provide: 'IEventRepository',
      useClass: EventRepository,
    },
    {
      provide: 'IEventNotifier',
      useClass: EventNotifier,
    },

    {
      provide: 'ICancelEventPort',
      useClass: CancelEventUseCase,
    },
    {
      provide: 'ICreateEventPort',
      useClass: CreateEventUseCase,
    },
    {
      provide: 'IUpdateEventPort',
      useClass: UpdateEventUseCase,
    },
    {
      provide: 'IGetEventByIdPort',
      useClass: GetEventUseCase,
    },
    {
      provide: 'IFindAllEventsPort',
      useClass: FindAllEventsUseCase,
    },
  ],

  exports: [
    'ICancelEventPort',
    'ICreateEventPort',
    'IUpdateEventPort',
    'IGetEventByIdPort',
    'IFindAllEventsPort',
  ],
})
export class EventsModule {}
