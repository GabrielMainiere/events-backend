import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationTypeHelper } from '../helper/notification-type.helper';


export class UserPreference {
  public readonly id: string;
  public readonly userId: string;
  public readonly notificationType: NotificationType;
  public readonly channel: NotificationChannel;
  private _isEnabled: boolean;
  private _updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
    isEnabled: boolean = true,
    updatedAt: Date = new Date()
  ) {
    if (! userId || userId.trim(). length === 0) {
      throw new Error('userId cannot be empty');
    }

    this.id = id;
    this.userId = userId;
    this.notificationType = notificationType;
    this.channel = channel;
    this._isEnabled = isEnabled;
    this._updatedAt = updatedAt;
  }

  enable(): void {
    this._isEnabled = true;
    this._updatedAt = new Date();
  }

  disable(): void {
    if (NotificationTypeHelper.isMandatory(this.notificationType)) {  // ← Acesso direto
      throw new Error(
        `Cannot disable mandatory notification type: "${this.notificationType}".   ` +
        `Mandatory types (ACCOUNT, PAYMENTS) cannot be disabled.`
      );
    }

    this._isEnabled = false;
    this._updatedAt = new Date();
  }

  updateEnabledState(isEnabled: boolean): void {
    if (isEnabled) {
      this.enable();
    } else {
      this.  disable();
    }
  }

  get isEnabled(): boolean {
    return this._isEnabled;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  equals(other: UserPreference): boolean {
    return this.id === other.id;
  }
}