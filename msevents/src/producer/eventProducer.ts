import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EVENT_CHANGE_PATTERN } from 'src/core/constants';
import { EventChangeAction } from 'src/core/enum/eventChangeAction';
import { IEventNotificationRequest } from 'src/modules/events/interfaces/IEventRegistrationRequest';

@Injectable()
export class EventProducer implements OnModuleInit {
  constructor(@Inject('RABBITMQ_EVENTS') private readonly client: ClientProxy) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async publish(event: IEventNotificationRequest, action: EventChangeAction) {
    const routingKey = EVENT_CHANGE_PATTERN
    await lastValueFrom(
      this.client.emit(routingKey, { action, event }),
    );
  }
}
