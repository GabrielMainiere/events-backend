import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { RABBITMQ } from './rabbitMQ.constants';


@Injectable()
export class RabbitMQConfig implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.setupRabbitMQ();
  }

  private async setupRabbitMQ() {
    const url = this.configService.get<string>('RABBITMQ_URL');

    try {
      const connection = await amqp.connect(url);
      const channel = await connection.createChannel();

      await channel.assertExchange(RABBITMQ.EXCHANGE, 'topic', { durable: true });

      await channel.assertQueue(RABBITMQ.DLQ, { durable: true });

      await channel.assertQueue(RABBITMQ.QUEUE, {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': '', 
          'x-dead-letter-routing-key': RABBITMQ.DLQ, 
        },
      });

      await channel.bindQueue(
        RABBITMQ.QUEUE, 
        RABBITMQ.EXCHANGE, 
        RABBITMQ.BINDING_PATTERN
      );
      
      console.log('RabbitMQ Topology configurada com Constantes!');
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Erro no setup do RabbitMQ:', error);
    }
  }
}