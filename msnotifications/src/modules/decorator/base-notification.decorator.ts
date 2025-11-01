import { NotificationLog } from '@prisma/client';
import { INotificationStrategy } from 'src/interfaces/iNotificationStategy';

export abstract class BaseNotificationDecorator implements INotificationStrategy {
  protected strategy: INotificationStrategy;

  public setStrategy(strategy: INotificationStrategy): void {
    this.strategy = strategy;
  }

  abstract send(notification: NotificationLog): Promise<void>;
}