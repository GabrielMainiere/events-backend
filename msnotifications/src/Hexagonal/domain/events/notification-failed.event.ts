import { DomainEvent } from './interface/domain-event.interface';

export class NotificationFailedEvent implements DomainEvent {
  readonly eventName = 'NotificationFailed';
  readonly aggregateName = 'Notification';
  readonly occurredAt: Date;

  constructor(
    public readonly aggregateId: string,
    public readonly userId: string,
    public readonly notificationType: string,
    public readonly channel: string,
    public readonly recipientAddress: string,
    public readonly templateName: string,
    public readonly errorMessage: string,
    public readonly retryCount: number,
    occurredAt?: Date
  ) {
    this.occurredAt = occurredAt || new Date();
  }

  static create(data: {
    notificationId: string;
    userId: string;
    notificationType: string;
    channel: string;
    recipientAddress: string;
    templateName: string;
    errorMessage: string;
    retryCount: number;
  }): NotificationFailedEvent {
    return new NotificationFailedEvent(
      data.notificationId,
      data.userId,
      data.notificationType,
      data.channel,
      data.recipientAddress,
      data.templateName,
      data.errorMessage,
      data.retryCount
    );
  }

  hasExceededRetryLimit(maxRetries: number = 3): boolean {
    return this.retryCount >= maxRetries;
  }

  shouldGoToDLQ(maxRetries: number = 3): boolean {
    return this.hasExceededRetryLimit(maxRetries);
  }

  toJSON(): Record<string, any> {
    return {
      eventName: this.eventName,
      aggregateName: this.aggregateName,
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt.toISOString(),
      userId: this. userId,
      notificationType: this.notificationType,
      channel: this.channel,
      recipientAddress: this.recipientAddress,
      templateName: this.templateName,
      errorMessage: this.errorMessage,
      retryCount: this.retryCount,
    };
  }
}