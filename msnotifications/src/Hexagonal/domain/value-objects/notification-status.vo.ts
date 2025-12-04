export enum NotificationStatusEnum {
  PENDING = 'PENDENTE',
  PROCESSING = 'PROCESSANDO',
  SENT = 'ENVIADO',
  FAILED = 'FALHA',
}

export class NotificationStatus {
  private readonly value: NotificationStatusEnum;

  private constructor(value: NotificationStatusEnum) {
    this.value = value;
  }

  static createPending(): NotificationStatus {
    return new NotificationStatus(NotificationStatusEnum.PENDING);
  }

  static createProcessing(): NotificationStatus {
    return new NotificationStatus(NotificationStatusEnum.PROCESSING);
  }

  static createSent(): NotificationStatus {
    return new NotificationStatus(NotificationStatusEnum. SENT);
  }

  static createFailed(): NotificationStatus {
    return new NotificationStatus(NotificationStatusEnum.FAILED);
  }

  static fromString(value: string): NotificationStatus {
    const enumValue = Object.values(NotificationStatusEnum).find(v => v === value);
    if (!enumValue) {
      throw new Error(`Invalid notification status: ${value}`);
    }
    return new NotificationStatus(enumValue);
  }

  isPending(): boolean {
    return this.value === NotificationStatusEnum. PENDING;
  }

  isProcessing(): boolean {
    return this.value === NotificationStatusEnum.PROCESSING;
  }

  isSent(): boolean {
    return this.value === NotificationStatusEnum.SENT;
  }

  isFailed(): boolean {
    return this.value === NotificationStatusEnum.FAILED;
  }

  getValue(): NotificationStatusEnum {
    return this.value;
  }

  equals(other: NotificationStatus): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}