import { Controller, Inject, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RABBITMQ } from './config/rabbitMQ.constants';
import type{ INotificationProcessor } from 'src/modules/notification-processor/interfaces/iNotificationProcessorService';

@Controller()
export class NotificationConsumer {
  private readonly logger = new Logger(NotificationConsumer.name);
  constructor(
    @Inject('INotificationProcessor') 
    private readonly notificationProcessor: INotificationProcessor
  ) {}

  @EventPattern(RABBITMQ.ROUTING_KEY_DISPATCH)
  async handleNotification(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      this.logger.log(`Nova notificação recebida: ${data.template_name} para ${data.recipient_address}`);
      
      await this.notificationProcessor.process({
        userId: data.user_id,
        recipientAddress: data.recipient_address,
        templateName: data.template_name,
        payloadJson: JSON.stringify(data.payload), 
      });

      channel.ack(originalMsg);
      this.logger.log(`Notificação processada com sucesso!`);

    } catch (error) {
      this.logger.error(`Erro ao processar notificação: ${error.message}`);
      channel.nack(originalMsg, false, false);
    }
  }
}