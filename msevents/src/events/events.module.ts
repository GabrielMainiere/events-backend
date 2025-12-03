import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsResolver } from './events.resolver';
import { EventRepository } from './repositories/events.repository';
import '../enum/registerEnums'
import { EventNotifier } from './services/eventsNotifier';
//import { EventRegistrationCount} from './services/eventsRegistrationCount';
import { ProducerModule } from 'src/producer/producer.module';

@Module({
  imports: [
    ProducerModule,
  ],
  providers: [
    EventsResolver,
    EventsService,
    {
      provide: 'IEventRepository',
      useClass: EventRepository,
    },
    {
      provide: 'IEventNotifier',
      useClass: EventNotifier,
    },
    //{
      //provide: 'IEventRegistrationCount',
      //useClass: EventRegistrationCount
    //},
  ],
  exports: [EventsService],
})
export class EventsModule {}
