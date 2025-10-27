import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { EventRepository } from './events.repository';
import '../enum/registerEnums'
import { GrpcModule } from 'src/grpc/grpc.module';

@Module({
  imports: [GrpcModule],
  providers: [EventsResolver, EventsService, EventRepository],
})
export class EventsModule {}
