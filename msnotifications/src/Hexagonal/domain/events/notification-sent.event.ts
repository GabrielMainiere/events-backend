import { DomainEvent } from './interface/domain-event.interface';

export class NotificationSentEvent implements DomainEvent {
  readonly eventName = 'NotificationSent';
  readonly aggregateName = 'Notification';
  readonly occurredAt: Date;

  constructor(
    public readonly aggregateId: string,
    public readonly userId: string,
    public readonly notificationType: string,
    public readonly channel: string,
    public readonly recipientAddress: string,
    public readonly templateName: string,
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
  }): NotificationSentEvent {
    return new NotificationSentEvent(
      data.notificationId,
      data.userId,
      data.notificationType,
      data.channel,
      data.recipientAddress,
      data.templateName
    );
  }

  toJSON(): Record<string, any> {
    return {
      eventName: this.eventName,
      aggregateName: this.aggregateName,
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt.toISOString(),
      userId: this.userId,
      notificationType: this.notificationType,
      channel: this.channel,
      recipientAddress: this.recipientAddress,
      templateName: this.templateName,
    };
  }
}