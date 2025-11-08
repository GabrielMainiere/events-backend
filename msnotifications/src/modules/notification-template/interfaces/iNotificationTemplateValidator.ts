import { NotificationTemplate } from '@prisma/client';

export interface INotificationTemplateValidator {

  findByNameOrFail(templateName: string): Promise<NotificationTemplate>;

  exists(templateName: string): Promise<boolean>;

  findByIdOrFail(id: string): Promise<NotificationTemplate>;

  validateUniqueTemplateName(
    template_name: string,
    excludeId?: string,
  ): Promise<void>;
}