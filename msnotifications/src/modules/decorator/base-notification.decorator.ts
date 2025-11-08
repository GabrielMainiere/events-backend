import { INotifier } from "./interfaces/iNotifier";

export abstract class BaseNotificationDecorator implements INotifier {
  constructor(protected readonly notifier: INotifier) {}

  abstract send(recipient: string, subject: string, body: string): Promise<void>;
}