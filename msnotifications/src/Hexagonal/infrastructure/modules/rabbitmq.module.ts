import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQConfig } from '../adapters/input/messaging/config/rabbitMQ.config';
import { NotificationModule } from './notification.module';
import { RabbitMQNotificationConsumer } from '../adapters/input/messaging/notification.consumer';

@Module({
  imports: [
    ConfigModule,
    NotificationModule,
  ],
  controllers: [
    RabbitMQNotificationConsumer,
  ],
  providers: [
    RabbitMQConfig,
  ],
})
export class RabbitMQModule {}