import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { RABBITMQ } from './constants';


@Injectable()
export class RabbitMQConfig implements OnModuleInit {
  private readonly logger = new Logger(RabbitMQConfig.name);

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.setupRabbitMQ();
  }

  private async setupRabbitMQ() {
    const url = this.configService.get<string>('RABBITMQ_URL');

    try {
      this.logger.log('Setting up RabbitMQ topology...  ');

      const connection = await amqp.connect(url);
      const channel = await connection.createChannel();

      await channel.assertExchange(RABBITMQ.EXCHANGE, 'topic', { durable: true });
      this.logger.log(`Exchange created: ${RABBITMQ.EXCHANGE}`);

      await channel.assertQueue(RABBITMQ.DLQ, { durable: true });
      this.logger.log(`DLQ created: ${RABBITMQ.DLQ}`);

      await channel.assertQueue(RABBITMQ.QUEUE, {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': '',
          'x-dead-letter-routing-key': RABBITMQ.DLQ,
        },
      });
      this.logger.log(`Queue created: ${RABBITMQ.QUEUE}`);


      await channel.bindQueue(
        RABBITMQ.QUEUE,
        RABBITMQ.EXCHANGE,
        RABBITMQ.BINDING_PATTERN,
      );
      this.logger.log(
        `Binding created: ${RABBITMQ.QUEUE} ← ${RABBITMQ.EXCHANGE} (${RABBITMQ.BINDING_PATTERN})`
      );

      this.logger.log('RabbitMQ topology configured successfully!');

      await channel.close();
      await connection.close();

    } catch (error) {
      this.logger.error(`Error setting up RabbitMQ: ${error.message}`);
      throw error;
    }
  }
}