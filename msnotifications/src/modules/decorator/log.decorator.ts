import { Injectable, Logger } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { INotificationStrategy } from 'src/interfaces/iNotificationStategy';


@Injectable()
export class LogNotificationDecorator implements INotificationStrategy {
  private readonly logger = new Logger(LogNotificationDecorator.name);

  private strategy: INotificationStrategy;

  public setStrategy(strategy: INotificationStrategy) {
    this.strategy = strategy;
  }

  async send(notification: NotificationLog): Promise<void> {
    if (!this.strategy) {
      throw new Error('Nenhuma estratégia foi definida para o Decorator de Log.');
    }

    const startTime = Date.now();
    this.logger.log(`[Notificação ${notification.id}] Iniciando envio... Canal: ${notification.channel}, Para: ${notification.recipient_address}`);
    
    try {
      await this.strategy.send(notification);

      const duration = Date.now() - startTime;
      this.logger.log(`[Notificação ${notification.id}] Enviado com sucesso! Duração: ${duration}ms`);
    
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`[Notificação ${notification.id}] Falha no envio. Duração: ${duration}ms. Erro: ${error.message}`);
      throw error;
    }
  }
}