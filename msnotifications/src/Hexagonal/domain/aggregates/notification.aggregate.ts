import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';
import { NotificationType } from '../value-objects/notification-type.vo';
import { NotificationChannel } from '../value-objects/notification-channel.vo';
import { NotificationStatus } from '../value-objects/notification-status.vo';
import { DomainEvent } from '../events/domain-event.interface';
import { NotificationSentEvent } from '../events/notification-sent.event';
import { NotificationFailedEvent } from '../events/notification-failed.event';

export class Notification {
  private domainEvents: DomainEvent[] = [];

  public readonly id: string;
  public readonly userId: UserId;
  public readonly notificationType: NotificationType;
  public readonly channel: NotificationChannel;
  public readonly recipientAddress: Email;
  public readonly templateName: string;
  public readonly createdAt: Date;

  constructor(
    id: string,
    userId: UserId,
    notificationType: NotificationType,
    channel: NotificationChannel,
    recipientAddress: Email,
    templateName: string,
    private _payload: Record<string, any>,
    private _status: NotificationStatus,
    private _errorMessage?: string,
    private _retryCount: number = 0,
    private _sentAt?: Date,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.notificationType = notificationType;
    this. channel = channel;
    this. recipientAddress = recipientAddress;
    this.templateName = templateName;
    this.createdAt = createdAt;
  }

  get payload(): Record<string, any> {
    return { ...this._payload };
  }

  get status(): NotificationStatus {
    return this._status;
  }

  get errorMessage(): string | undefined {
    return this._errorMessage;
  }

  get retryCount(): number {
    return this._retryCount;
  }

  get sentAt(): Date | undefined {
    return this._sentAt;
  }

  startProcessing(): void {
    if (! this._status.isPending()) {
      throw new Error(
        `Cannot start processing notification with status ${this._status.toString()}`
      );
    }

    this._status = NotificationStatus.createProcessing();
  }

  markAsSent(): void {
    if (!this._status.isProcessing()) {
      throw new Error(
        `Cannot mark as sent notification with status ${this._status.toString()}`
      );
    }

    this._status = NotificationStatus.createSent();
    this._sentAt = new Date();

    this.addDomainEvent(
      NotificationSentEvent.create({
        notificationId: this.id,
        userId: this.userId.getValue(),
        notificationType: this.notificationType.toString(),
        channel: this.channel.toString(),
        recipientAddress: this.recipientAddress.getValue(),
        templateName: this. templateName,
      })
    );
  }

  markAsFailed(error: Error): void {
    if (!this._status.isProcessing()) {
      throw new Error(
        `Cannot mark as failed notification with status ${this._status.toString()}`
      );
    }

    this._status = NotificationStatus. createFailed();
    this._errorMessage = error.message;

    this.addDomainEvent(
      NotificationFailedEvent.create({
        notificationId: this.id,
        userId: this.userId.getValue(),
        notificationType: this.notificationType.toString(),
        channel: this.channel.toString(),
        recipientAddress: this.recipientAddress.getValue(),
        templateName: this.templateName,
        errorMessage: error.message,
        retryCount: this._retryCount,
      })
    );
  }

  incrementRetryCount(): void {
    this._retryCount++;
  }

  private addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  getDomainEvents(): DomainEvent[] {
    return [... this.domainEvents];
  }

  clearDomainEvents(): void {
    this.domainEvents = [];
  }
}