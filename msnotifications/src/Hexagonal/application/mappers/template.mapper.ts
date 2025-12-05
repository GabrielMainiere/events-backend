import { Template } from '../../domain/models/template.model';
import { CreateTemplateCommand } from '../dtos/templates/create-template.command';
import { UpdateTemplateCommand } from '../dtos/templates/update-template.command';
import { TemplateResponse } from '../dtos/templates/template.response';
import { randomUUID } from 'crypto';

export class TemplateMapper {
  static createCommandToModel(command: CreateTemplateCommand): Template {
    const now = new Date();
    
    return {
      id: randomUUID(),
      templateName: command.templateName,
      notificationType: command.notificationType,
      channel: command.channel,
      subjectTemplate: command.subjectTemplate,
      bodyTemplate: command.bodyTemplate,
      createdAt: now,
      updatedAt: now,
    };
  }

  static applyUpdateCommand(existing: Template, command: UpdateTemplateCommand): Template {
    return {
      ...existing,
      templateName: command.templateName ?? existing.templateName,
      subjectTemplate: command.subjectTemplate ??  existing.subjectTemplate,
      bodyTemplate: command.bodyTemplate ??  existing.bodyTemplate,
      updatedAt: new Date(),
    };
  }

  static modelToResponse(template: Template): TemplateResponse {
    return new TemplateResponse(
      template.id,
      template.templateName,
      template.notificationType,
      template.channel,
      template.subjectTemplate,
      template.bodyTemplate,
      template.createdAt,
      template.updatedAt
    );
  }

  static modelListToResponseList(templates: Template[]): TemplateResponse[] {
    return templates.map(t => this.modelToResponse(t));
  }
}