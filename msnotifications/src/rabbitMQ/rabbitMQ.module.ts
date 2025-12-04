import { Module } from '@nestjs/common';
import { NotificationConsumer } from './notification.consumer';
import { ConfigModule } from '@nestjs/config';
import { NotificationProcessorModule } from 'src/modules/notification-processor/notification-processor.module';
import { RabbitMQConfig } from './config/rabbitMQ.config';


@Module({
  imports: [
    ConfigModule, 
    NotificationProcessorModule, 
  ],
  controllers: [
    NotificationConsumer
  ],
  providers: [
    RabbitMQConfig 
  ],
})
export class RabbitMQModule {}