import { INotificationStrategy } from 'src/common/interfaces/iNotificationStategy';

export abstract class BaseNotificationDecorator implements INotificationStrategy {
  constructor(protected readonly strategy: INotificationStrategy) {}

  abstract send(recipient: string, subject: string, body: string): Promise<void>;
}