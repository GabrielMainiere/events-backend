import { NotificationType } from '@prisma/client';

export class NotificationTypeHelper {

  private static readonly MANDATORY_TYPES: NotificationType[] = [
    NotificationType.ACCOUNT,
    NotificationType.PAYMENTS,
  ];

  static isMandatory(notificationType: NotificationType): boolean {
    return this.MANDATORY_TYPES.includes(notificationType);
  }

  static isOptional(notificationType: NotificationType): boolean {
    return !this.isMandatory(notificationType);
  }

  static getMandatoryTypes(): NotificationType[] {
    return [...this.MANDATORY_TYPES];
  }

  static getOptionalTypes(): NotificationType[] {
    return Object.values(NotificationType).filter(
      (type) => !this.MANDATORY_TYPES.includes(type),
    );
  }
}