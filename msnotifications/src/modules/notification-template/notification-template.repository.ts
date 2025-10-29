import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-ds/prisma.service';
import { NotificationTemplate } from '@prisma/client';
import { CreateTemplateInput } from 'src/dto/createNotificationTemplate.input';
import { UpdateTemplateInput } from 'src/dto/updateNotificationTemplate.input';

@Injectable()
export class NotificationTemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<NotificationTemplate | null> {
    return this.prisma.notificationTemplate.findUnique({
      where: { id },
    });
  }

  async findByName(template_name: string): Promise<NotificationTemplate | null> {
    return this.prisma.notificationTemplate.findUnique({
      where: { template_name },
    });
  }

  async findAll(): Promise<NotificationTemplate[]> {
    return this.prisma.notificationTemplate.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async create(data: CreateTemplateInput): Promise<NotificationTemplate> {
    return this.prisma.notificationTemplate.create({
      data: {
        template_name: data.template_name,
        notification_type: data.notification_type,
        channel: data.channel,
        subject_template: data.subject_template,
        body_template: data.body_template,
      },
    });
  }

  async update(id: string, data: UpdateTemplateInput): Promise<NotificationTemplate> {
    return this.prisma.notificationTemplate.update({
      where: { id },
      data: {
        template_name: data.template_name,
        notification_type: data.notification_type,
        channel: data.channel,
        subject_template: data.subject_template,
        body_template: data.body_template,
      },
    });
  }

  async delete(id: string): Promise<NotificationTemplate> {
    return this.prisma.notificationTemplate.delete({
      where: { id },
    });
  }
}
