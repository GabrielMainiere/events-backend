import { NotificationTemplate } from '@prisma/client';
import { CreateTemplateInput } from 'src/common/dto/createNotificationTemplate.input';
import { UpdateTemplateInput } from 'src/common/dto/updateNotificationTemplate.input';

export interface INotificationTemplateService {
  findByName(template_name: string): Promise<NotificationTemplate | null>;
  findOne(id: string): Promise<NotificationTemplate>;
  findAll(): Promise<NotificationTemplate[]>;
  create(data: CreateTemplateInput): Promise<NotificationTemplate>;
  update(id: string, data: UpdateTemplateInput): Promise<NotificationTemplate>;
  delete(id: string): Promise<NotificationTemplate>;
}