import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventProducer } from './eventProducer';
import { EVENTS_EXCHANGE, QUEUES } from 'src/core/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_EVENTS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: QUEUES.EVENTS_QUEUE,
          queueOptions: {
            durable: true,
            arguments: {
              'x-dead-letter-exchange': '', 
            },
          },
          exchange: EVENTS_EXCHANGE,
          exchangeType: 'topic',
        },
      },
    ]),
  ],
  providers: [EventProducer],
  exports: [EventProducer],
})
export class ProducerModule {}
