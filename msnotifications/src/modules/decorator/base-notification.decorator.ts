import { INotificationStrategy } from "../strategy/interfaces/iNotificationStrategy";

export abstract class BaseNotificationDecorator implements INotificationStrategy {
  constructor(protected readonly strategy: INotificationStrategy) {}

  abstract send(recipient: string, subject: string, body: string): Promise<void>;
}