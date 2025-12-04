import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBITMQ } from '../rabbitMQ.constants';
import { NotificationProducer } from '../notification.producer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
          queue: RABBITMQ.QUEUE,
          exchange: RABBITMQ.EXCHANGE, 
          exchangeType: 'topic',
          queueOptions: {
            durable: true,
            arguments: {
              'x-dead-letter-exchange': '',
              'x-dead-letter-routing-key': RABBITMQ.DLQ,
            },
          },
        },
      },
    ]),
  ],
  providers: [NotificationProducer],
  exports: [NotificationProducer],
})
export class NotificationProducerModule {}