import { Injectable } from '@nestjs/common';
import { NotificationTemplate } from '@prisma/client';
import { INotificationTemplateRepository } from 'src/modules/notification-template/interfaces/iNotificationTemplateRepository';
import { PrismaClientSingleton } from 'src/core/prismaClientSingleton';

@Injectable()
export class NotificationTemplateRepository implements INotificationTemplateRepository {
  private prisma = PrismaClientSingleton.getInstance();

  async findById(id: string): Promise<NotificationTemplate | null> {
    return this.prisma.notificationTemplate.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<NotificationTemplate[]> {
    return this.prisma.notificationTemplate.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async create(data: Partial<NotificationTemplate>): Promise<NotificationTemplate> {
    return this.prisma.notificationTemplate.create({
      data: {
        template_name: data.template_name!,
        notification_type: data.notification_type!,
        channel: data.channel!,
        subject_template: data.subject_template!,
        body_template: data.body_template!,
      },
    });
  }

  async update(id: string, data: Partial<NotificationTemplate>): Promise<NotificationTemplate> {
    return this.prisma.notificationTemplate.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<NotificationTemplate> {
    return this.prisma.notificationTemplate.delete({
      where: { id },
    });
  }

  async findByName(templateName: string): Promise<NotificationTemplate | null> {
    return this.prisma.notificationTemplate.findUnique({
      where: { template_name: templateName },
    });
  }
}