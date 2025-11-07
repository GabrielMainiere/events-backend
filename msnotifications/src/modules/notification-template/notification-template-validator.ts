import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationTemplate } from '@prisma/client';
import { NotificationTemplateRepository } from './notification-template.repository';
import { RequestLogger } from '../logger/request-logger';

@Injectable()
export class NotificationTemplateValidator {
  constructor(
    private readonly repository: NotificationTemplateRepository,
    private readonly requestLog: RequestLogger,
  ) {}

  async findByNameOrFail(templateName: string): Promise<NotificationTemplate> {
    const template = await this.repository.findByName(templateName);

    if (!template) {
      this.requestLog.logTemplateNotFound(templateName);
      throw new NotFoundException(`Template não encontrado: ${templateName}`);
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
      throw new NotFoundException(`Template com ID "${id}" não encontrado`);
    }

    return template;
  }

    async validateUniqueTemplateName(
      template_name: string,
      excludeId?: string,
    ): Promise<void> {
      const existing = await this.repository.findByName(template_name);
      
      if (existing && existing.id !== excludeId) {
        throw new ConflictException(
          `Template com nome "${template_name}" já existe`,
        );
      }
    }
}