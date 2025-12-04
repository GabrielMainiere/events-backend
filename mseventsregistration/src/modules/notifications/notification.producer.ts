import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RABBITMQ } from './rabbitMQ.constants';


@Injectable()
export class NotificationProducer implements OnModuleInit {
  private readonly logger = new Logger(NotificationProducer.name);

  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy
  ) {}

  async onModuleInit() {
    try {
      await this.client.connect();
      this.logger.log('Connected to RabbitMQ (Event Registration Producer)');
    } catch (error) {
      this.logger.error('Error connecting to RabbitMQ', error);
    }
  }

  async publish(data: { recipient_address: string; template_name: string; user_id: string; payload: any }) {
    const routingKey = RABBITMQ.ROUTING_KEY_DISPATCH;
    await lastValueFrom(
      this.client.emit(routingKey, data)
    );
  }
}