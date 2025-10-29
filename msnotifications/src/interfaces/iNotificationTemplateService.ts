import { NotificationTemplate } from '@prisma/client';

export interface INotificationTemplateService {

  findByName(template_name: string): Promise<NotificationTemplate | null>;

  findOne(id: string): Promise<NotificationTemplate>;
}