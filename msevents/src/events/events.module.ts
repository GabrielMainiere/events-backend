import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';

@Module({
  providers: [EventsResolver, EventsService],
})
export class EventsModule {}
