import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ProcessNotificationUseCase } from '../../../../application/use-cases/notifications/process-notification.use-case';
import { ProcessNotificationCommand } from '../../../../application/dtos/notifications/process-notification.command';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RABBITMQ } from './config/constants';


@Controller()
export class RabbitMQNotificationConsumer {
  private readonly logger = new Logger(RabbitMQNotificationConsumer.name);

  constructor(
    private readonly processNotificationUseCase: ProcessNotificationUseCase,
  ) {}

  @EventPattern(RABBITMQ.ROUTING_KEY_DISPATCH)
  async handleNotificationProcess(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context. getChannelRef();
    const originalMsg = context.getMessage();

    this.logger.log(
      `Nova notificação recebida: ${data.template_name} para ${data.recipient_address}`
    );

    try {
      const command = plainToInstance(ProcessNotificationCommand, {
        userId: data.user_id,
        recipientAddress: data. recipient_address,
        templateName: data.template_name,
        payload: data.payload,
      });

      await validateOrReject(command);
      this.logger.log(`Payload validado | userId: ${command.userId}`);

      await this.processNotificationUseCase.execute(command);

      channel.ack(originalMsg);
      this.logger.log(`Notificação processada com sucesso!`);

    } catch (error) {
      this.logger.error(`Erro ao processar notificação: ${error.message}`);
      channel.nack(originalMsg, false, false);
      this.logger.warn(`Mensagem rejeitada | enviada para DLQ`);
    }
  }
}