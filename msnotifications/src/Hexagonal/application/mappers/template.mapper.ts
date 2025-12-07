import { Template } from '../../domain/entities/template.entity';
import { CreateTemplateCommand } from '../dtos/templates/create-template.command';
import { UpdateTemplateCommand } from '../dtos/templates/update-template.command';
import { TemplateResponse } from '../dtos/templates/template.response';
import { NotificationType } from '../../domain/enums/notification-type.enum';
import { NotificationChannel } from '../../domain/enums/notification-channel.enum';
import { CreateTemplateProps } from 'src/Hexagonal/domain/factories/types/template.types';

export class TemplateMapper {

  static createCommandToDomainProps(command: CreateTemplateCommand): CreateTemplateProps {
    return {
      templateName: command.templateName,
      notificationType: command.notificationType as NotificationType,
      channel: command.channel as NotificationChannel,
      subjectTemplate: command.subjectTemplate,
      bodyTemplate: command.bodyTemplate,
    };
  }

  static applyUpdateCommand(template: Template, command: UpdateTemplateCommand): void {
    if (command.templateName) {
      template.updateName(command.templateName); 
    }

    if (command.subjectTemplate && command.bodyTemplate) {
      template.updateContent(command.subjectTemplate, command. bodyTemplate);  
    } else if (command.subjectTemplate || command.bodyTemplate) {
      template.updateContent(
        command.subjectTemplate ??  template.subjectTemplate,
        command.bodyTemplate ?? template.bodyTemplate
      );
    }

  }

  static entityToResponse(template: Template): TemplateResponse {
    return new TemplateResponse({
      id: template.id,
      templateName: template.templateName,
      notificationType: template.notificationType,  
      channel: template.channel,  
      subjectTemplate: template.subjectTemplate,
      bodyTemplate: template.bodyTemplate,
      createdAt: template.createdAt,
      updatedAt: template. updatedAt,
    });
  }

  static entityListToResponseList(templates: Template[]): TemplateResponse[] {
    return templates.map(t => this. entityToResponse(t));
  }
}