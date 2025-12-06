import { NotificationType } from '../enums/notification-type.enum';

export class NotificationTypeHelper {

  private static readonly MANDATORY_TYPES: NotificationType[] = [
    NotificationType.ACCOUNT,
    NotificationType.PAYMENTS,
  ];

  static isMandatory(type: NotificationType): boolean {
    return this.MANDATORY_TYPES.includes(type);
  }

  static isOptional(type: NotificationType): boolean {
    return !this.isMandatory(type);
  }

  static getMandatoryTypes(): NotificationType[] {
    return [... this.MANDATORY_TYPES];
  }

  static getOptionalTypes(): NotificationType[] {
    return Object.values(NotificationType). filter(
      (type) => !this. MANDATORY_TYPES.includes(type),
    );
  }

  static getAllTypes(): NotificationType[] {
    return Object.values(NotificationType);
  }
}