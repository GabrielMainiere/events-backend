import { NotificationTemplate } from '@prisma/client';

export interface INotificationTemplateRepository {
  findById(id: string): Promise<NotificationTemplate | null>;
  findAll(): Promise<NotificationTemplate[]>;
  create(data: Partial<NotificationTemplate>): Promise<NotificationTemplate>;
  update(id: string, data: Partial<NotificationTemplate>): Promise<NotificationTemplate>;
  delete(id: string): Promise<NotificationTemplate>;
  findByName(templateName: string): Promise<NotificationTemplate | null>;

}