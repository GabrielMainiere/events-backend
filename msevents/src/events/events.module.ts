import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsResolver } from './events.resolver';
import { EventRepository } from './repositories/events.repository';
import '../enum/registerEnums'
import { GrpcModule } from 'src/grpc/grpc.module';
import { EventsNotifier } from './services/eventsNotifier';
import { EventRegistrationCount} from './services/eventsRegistrationCount';

@Module({
  imports: [GrpcModule],
  providers: [
    EventsResolver,
    EventsService,
    {
      provide: 'IEventRepository',
      useClass: EventRepository,
    },
    {
      provide: 'IEventNotifier',
      useClass: EventsNotifier,
    },
    {
      provide: 'IEventRegistrationCount',
      useClass: EventRegistrationCount
    },
  ],
  exports: [EventsService],
})
export class EventsModule {}
