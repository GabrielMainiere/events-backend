import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventProducer } from './eventProducer.adapter';
import { EVENTS_EXCHANGE, QUEUES } from 'src/core/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_EVENTS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: QUEUES.REGISTRATION_QUEUE,
          queueOptions: {
            durable: true
          },
          exchange: EVENTS_EXCHANGE,
          exchangeType: 'topic'
        }
      }
    ])
  ],
  providers: [EventProducer],
  exports: [EventProducer]
})
export class ProducerModule {}
