import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateInput } from 'src/common/dto/createNotificationTemplate.input';
import { UpdateTemplateInput } from 'src/common/dto/updateNotificationTemplate.input';
import { NotificationTemplateRepository } from './notification-template.repository';
import { INotificationTemplateService } from 'src/common/interfaces/iNotificationTemplateService';
import { NotificationTemplateValidator } from './notification-template-validator';

@Injectable()
export class NotificationTemplateService implements INotificationTemplateService {
  constructor(
    private readonly repository: NotificationTemplateRepository,
    private readonly validator: NotificationTemplateValidator,
  ) {}

  async findByName(template_name: string) {
    return this.repository.findByName(template_name);
  }

  async findOne(id: string) {
    return this.validator.findByIdOrFail(id);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async create(data: CreateTemplateInput) {
    await this.validator.validateUniqueTemplateName(data.template_name);
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateTemplateInput) {
    await this.findOne(id); 
    if (data.template_name) {
      await this.validator.validateUniqueTemplateName(data.template_name, id);
    }
    return this.repository.update(id, data);
  }
  
  async remove(id: string) {
    await this.validator.findByIdOrFail(id);
    return this.repository.delete(id);
  }
}