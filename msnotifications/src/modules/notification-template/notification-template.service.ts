import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateInput } from 'src/dto/createNotificationTemplate.input';
import { UpdateTemplateInput } from 'src/dto/updateNotificationTemplate.input';
import { NotificationTemplateRepository } from './notification-template.repository';
import { INotificationTemplateService } from 'src/interfaces/iNotificationTemplateService';

@Injectable()
export class NotificationTemplateService implements INotificationTemplateService {
  constructor(
    private readonly repository: NotificationTemplateRepository,
  ) {}

  async findByName(template_name: string) {
    return this.repository.findByName(template_name);
  }

  async findOne(id: string) {
    const template = await this.repository.findById(id);

    if (!template) {
      throw new NotFoundException(`Template com ID "${id}" não encontrado`);
    }

    return template;
  }

  async findAll() {
    return this.repository.findAll();
  }

  async create(data: CreateTemplateInput) {
    await this.validateUniqueTemplateName(data.template_name);
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateTemplateInput) {
    await this.findOne(id); 

    if (data.template_name) {
      await this.validateUniqueTemplateName(data.template_name, id);
    }

    return this.repository.update(id, data);
  }
  
  async remove(id: string) {
    const template = await this.repository.findById(id);

    if (!template) {
      throw new NotFoundException(`Template com ID "${id}" não encontrado`);
    }
    
    return this.repository.delete(id);
  }

  private async validateUniqueTemplateName(
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