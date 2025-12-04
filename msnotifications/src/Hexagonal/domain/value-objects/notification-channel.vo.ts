export enum NotificationChannelEnum {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
}

export class NotificationChannel {
  private readonly value: NotificationChannelEnum;

  private constructor(value: NotificationChannelEnum) {
    this.value = value;
  }

  static createEmail(): NotificationChannel {
    return new NotificationChannel(NotificationChannelEnum.EMAIL);
  }

  static createSms(): NotificationChannel {
    return new NotificationChannel(NotificationChannelEnum.SMS);
  }

  static createPush(): NotificationChannel {
    return new NotificationChannel(NotificationChannelEnum. PUSH);
  }

  static fromString(value: string): NotificationChannel {
    const enumValue = Object.values(NotificationChannelEnum).find(v => v === value);
    if (!enumValue) {
      throw new Error(`Invalid notification channel: ${value}`);
    }
    return new NotificationChannel(enumValue);
  }

  isEmail(): boolean {
    return this.value === NotificationChannelEnum.EMAIL;
  }

  isSms(): boolean {
    return this.value === NotificationChannelEnum.SMS;
  }

  isPush(): boolean {
    return this.value === NotificationChannelEnum.PUSH;
  }

  getValue(): NotificationChannelEnum {
    return this.value;
  }

  equals(other: NotificationChannel): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}