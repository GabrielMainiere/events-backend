import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ROUTING_KEYS } from 'src/core/constants';
import { IEventNotificationRequest } from 'src/events/interfaces/IEventRegistrationRequest';

@Injectable()
export class EventProducer {
  constructor(
    @Inject('RABBITMQ_EVENTS') private readonly client: ClientProxy,
  ) {}

  publishCreated(data: IEventNotificationRequest) {
    return this.client.emit(ROUTING_KEYS.CREATED, data);
  }

  publishUpdated(data: IEventNotificationRequest) {
    return this.client.emit(ROUTING_KEYS.UPDATED, data);
  }

  publishCanceled(data: IEventNotificationRequest) {
    return this.client.emit(ROUTING_KEYS.CANCELED, data);
  }
}
