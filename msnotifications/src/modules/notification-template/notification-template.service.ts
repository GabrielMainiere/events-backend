import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateInput } from 'src/dto/createNotificationTemplate.input';
import { UpdateTemplateInput } from 'src/dto/updateNotificationTemplate.input';
import { NotificationTemplateRepository } from './notification-template.repository';


@Injectable()
export class NotificationTemplateService {
  constructor(
    private readonly repository: NotificationTemplateRepository,
  ) {}

  async findByName(template_name: string) {
    return this.repository.findByName(template_name);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const template = await this.repository.findById(id);

    if (!template) {
      throw new NotFoundException(`Template com ID "${id}" não encontrado`);
    }

    return template;
  }

  async create(data: CreateTemplateInput) {
    const existing = await this.repository.findByName(data.template_name);
    
    if (existing) {
      throw new ConflictException(
        `Template com nome "${data.template_name}" já existe`,
      );
    }

    return this.repository.create(data);
  }

  async update(id: string, data: UpdateTemplateInput) {
    await this.findOne(id);

    if (data.template_name) {
      const existing = await this.repository.findByName(data.template_name);
      
      if (existing && existing.id !== id) {
        throw new ConflictException(
          `Já existe outro template com nome "${data.template_name}"`,
        );
      }
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
}