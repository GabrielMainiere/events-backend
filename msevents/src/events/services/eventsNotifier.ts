import { Injectable } from '@nestjs/common';
import { EventRegistrationClient } from 'src/grpc/clients/eventRegistrationClient';
import { lastValueFrom } from 'rxjs';
import { EventsGrpcMapper } from '../mappers/eventsGrpcMapper';
import { EventWithAddress } from '../repositories/events.repository';
import { IEventNotifier } from './IEventNotifier';

@Injectable()
export class EventsNotifier implements IEventNotifier{
  constructor(private readonly grpcClient: EventRegistrationClient) {}

    async notifyCreated(eventData: EventWithAddress): Promise<void> {
        try {
            await lastValueFrom(this.grpcClient.notifyEventCreated(EventsGrpcMapper.toGrpcEvent(eventData)));
        } catch (error) {
            console.log(`Grpc NotifyEventCreated failed: ${error.message}`);
        }
    }

    async notifyUpdated(eventData: EventWithAddress): Promise<void> {
        try {
            await lastValueFrom(this.grpcClient.notifyEventUpdated(EventsGrpcMapper.toGrpcEvent(eventData)))
        } catch (error) {
            console.log(`Grpc NotifyEventUpdated failed: ${error.message}`);
        }
    }

    async notifyCancelled(eventData: EventWithAddress): Promise<void> {
        try {
            await lastValueFrom(this.grpcClient.notifyEventCancelled(EventsGrpcMapper.toGrpcEvent(eventData)));
        } catch (error) {
            console.log(`Grpc NotifyEventCancelled failed: ${error.message}`);
        }
    }
}
