export enum NotificationTypeEnum {
  ACCOUNT = 'ACCOUNT',
  EVENT = 'EVENT',
  MARKETING = 'MARKETING',
  PAYMENTS = 'PAYMENTS',
}

export class NotificationType {
  private static readonly MANDATORY_TYPES = [
    NotificationTypeEnum.ACCOUNT,
    NotificationTypeEnum. PAYMENTS,
  ];

  private readonly value: NotificationTypeEnum;

  private constructor(value: NotificationTypeEnum) {
    this.value = value;
  }

  static createAccount(): NotificationType {
    return new NotificationType(NotificationTypeEnum.ACCOUNT);
  }

  static createEvent(): NotificationType {
    return new NotificationType(NotificationTypeEnum. EVENT);
  }

  static createMarketing(): NotificationType {
    return new NotificationType(NotificationTypeEnum.MARKETING);
  }

  static createPayments(): NotificationType {
    return new NotificationType(NotificationTypeEnum.PAYMENTS);
  }

  static fromString(value: string): NotificationType {
    const enumValue = Object.values(NotificationTypeEnum).find(v => v === value);
    if (!enumValue) {
      throw new Error(`Invalid notification type: ${value}`);
    }
    return new NotificationType(enumValue);
  }

  isMandatory(): boolean {
    return NotificationType.MANDATORY_TYPES. includes(this.value);
  }

  isOptional(): boolean {
    return ! this.isMandatory();
  }

  static getMandatoryTypes(): NotificationType[] {
    return this.MANDATORY_TYPES. map(type => new NotificationType(type));
  }

  static getOptionalTypes(): NotificationType[] {
    return Object.values(NotificationTypeEnum)
      .filter(type => ! this.MANDATORY_TYPES. includes(type))
      .map(type => new NotificationType(type));
  }

  getValue(): NotificationTypeEnum {
    return this.value;
  }

  equals(other: NotificationType): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}