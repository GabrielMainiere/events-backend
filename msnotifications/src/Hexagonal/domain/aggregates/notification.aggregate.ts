import { Email } from '../value-objects/email.vo';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationStatus } from '../enums/notification-status.enum';
import { DomainEvent } from '../events/interface/domain-event.interface';
import { NotificationSentEvent } from '../events/notification-sent.event';
import { NotificationFailedEvent } from '../events/notification-failed.event';

export class Notification {
  private domainEvents: DomainEvent[] = [];

  public readonly id: string;
  public readonly userId: string;
  public readonly notificationType: NotificationType;
  public readonly channel: NotificationChannel;
  public readonly recipientAddress: Email;
  public readonly templateName: string;
  public readonly createdAt: Date;

  constructor(
    id: string,
    userId: string,
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
    this.channel = channel;
    this.recipientAddress = recipientAddress;
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
    if (this._status !== NotificationStatus.PENDING) {
      throw new Error(
        `Cannot start processing notification with status ${this._status}. Expected: PENDING`
      );
    }

    this._status = NotificationStatus.PROCESSING;
  }

  markAsSent(): void {
    if (this._status !== NotificationStatus.PROCESSING) {
      throw new Error(
        `Cannot mark as sent notification with status ${this._status}. Expected: PROCESSING`
      );
    }

    this._status = NotificationStatus. SENT;
    this._sentAt = new Date();

    this.addDomainEvent(
      NotificationSentEvent.create({
        notificationId: this. id,
        userId: this. userId,
        notificationType: this.notificationType,
        channel: this.channel,
        recipientAddress: this.recipientAddress. getValue(),
        templateName: this. templateName,
      })
    );
  }

  markAsFailed(error: Error): void {
    if (this._status !== NotificationStatus.PROCESSING) {
      throw new Error(
        `Cannot mark as failed notification with status ${this._status}. Expected: PROCESSING`
      );
    }

    this._status = NotificationStatus.FAILED;
    this._errorMessage = error.message;

    this.addDomainEvent(
      NotificationFailedEvent.create({
        notificationId: this.id,
        userId: this.userId,
        notificationType: this. notificationType,
        channel: this.channel,
        recipientAddress: this.recipientAddress. getValue(),
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
    return [...this. domainEvents];
  }

  clearDomainEvents(): void {
    this.domainEvents = [];
  }
}