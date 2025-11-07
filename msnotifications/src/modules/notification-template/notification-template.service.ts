import { ConflictException, Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateTemplateInput } from 'src/common/dto/createNotificationTemplate.input';
import { UpdateTemplateInput } from 'src/common/dto/updateNotificationTemplate.input';
import type { INotificationTemplateRepository } from 'src/common/interfaces/iNotificationTemplateRepository';
import { NotificationTemplate } from '@prisma/client';

@Injectable()
export class NotificationTemplateService {
  constructor(
    @Inject('INotificationTemplateRepository')
    private readonly repository: INotificationTemplateRepository,
  ) {}

  async findByName(template_name: string): Promise<NotificationTemplate | null> {
    return this.repository.findByName(template_name);
  }

  async findOne(id: string): Promise<NotificationTemplate> {
    const template = await this.repository.findById(id);
    if (!template) {
      throw new NotFoundException(`Template with ID "${id}" not found`);
    }
    return template;
  }

  async findAll(): Promise<NotificationTemplate[]> {
    return this.repository.findAll();
  }

  async create(data: CreateTemplateInput): Promise<NotificationTemplate> {
    const exists = await this.repository.findByName(data.template_name);
    if (exists) {
      throw new ConflictException(
        `Template with name "${data.template_name}" already exists`,
      );
    }

    return this.repository.create({
      template_name: data.template_name,
      notification_type: data.notification_type,
      channel: data.channel,
      subject_template: data.subject_template,
      body_template: data.body_template,
    });
  }

  async update(id: string, data: UpdateTemplateInput): Promise<NotificationTemplate> {
    await this.findOne(id);

    if (data.template_name) {
      const exists = await this.repository.findByName(data.template_name);
      if (exists && exists.id !== id) {
        throw new ConflictException(
          `Template with name "${data.template_name}" already exists`,
        );
      }
    }

    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<NotificationTemplate> {
    await this.findOne(id);
    return this.repository.delete(id);
  }
}