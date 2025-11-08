import { ConflictException, Injectable, NotFoundException, Inject } from '@nestjs/common';
import { NotificationTemplate } from '@prisma/client';
import type { INotificationTemplateRepository } from 'src/common/interfaces/iNotificationTemplateRepository';
import { RequestLogger } from '../logger/request-logger';

@Injectable()
export class NotificationTemplateValidator {
  constructor(
    @Inject('INotificationTemplateRepository')
    private readonly repository: INotificationTemplateRepository,
    private readonly requestLog: RequestLogger,
  ) {}

  async findByNameOrFail(templateName: string): Promise<NotificationTemplate> {
    const template = await this.repository.findByName(templateName);

    if (!template) {
      this.requestLog.logTemplateNotFound(templateName);
      throw new NotFoundException(`Template not found: ${templateName}`);
    }

    return template;
  }

  async exists(templateName: string): Promise<boolean> {
    const template = await this.repository.findByName(templateName);
    return !!template;
  }

  async findByIdOrFail(id: string): Promise<NotificationTemplate> {
    const template = await this.repository.findById(id);

    if (!template) {
      throw new NotFoundException(`Template with ID "${id}" not found`);
    }

    return template;
  }

  async validateUniqueTemplateName(
    template_name: string,
    excludeId?: string,
  ): Promise<void> {
    if (excludeId) {
      const exists = await this.repository.findByName(template_name);
      if (exists && exists.id !== excludeId) {
        throw new ConflictException(
          `Template with name "${template_name}" already exists`,
        );
      }
    } else {
      const exists = await this.repository.findByName(template_name);
      if (exists) { 
        throw new ConflictException(
          `Template with name "${template_name}" already exists`,
        );
      }
    }
  }
}