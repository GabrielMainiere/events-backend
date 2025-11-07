import { INotificationStrategy } from 'src/common/interfaces/iNotificationStategy';

export abstract class BaseNotificationDecorator implements INotificationStrategy {
  protected strategy: INotificationStrategy;

  public setStrategy(strategy: INotificationStrategy): void {
    this.strategy = strategy;
  }

  abstract send(recipient: string, subject: string, body: string): Promise<void>;
}