import { randomUUID } from 'crypto';
import { Template } from '../entities/template.entity';
import { CreateTemplateProps, TemplateProps } from './types/template.types';

export class TemplateFactory {

  static create(props: CreateTemplateProps): Template {
    return new Template(
      randomUUID(),
      props.templateName,
      props.notificationType,
      props.channel,
      props.subjectTemplate,
      props.bodyTemplate,
      new Date(),
      new Date()
    );
  }

  static reconstitute(props: TemplateProps): Template {
    return new Template(
      props.id,
      props. templateName,
      props.notificationType,
      props.channel,
      props.subjectTemplate,
      props.bodyTemplate,
      props.createdAt,
      props.updatedAt
    );
  }
}