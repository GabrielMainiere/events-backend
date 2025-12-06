import { Template } from '../../../../../domain/entities/template.entity';
import { TemplateFactory } from '../../../../../domain/factories/template.factory';
import { NotificationType as DomainType } from '../../../../../domain/enums/notification-type.enum';
import { NotificationChannel as DomainChannel } from '../../../../../domain/enums/notification-channel.enum';
import { NotificationType as PrismaType } from '@prisma/client';
import { NotificationChannel as PrismaChannel } from '@prisma/client';
import type { Prisma, NotificationTemplate as PrismaTemplate } from '@prisma/client';
import { TemplateProps } from '../../../../../domain/factories/types/template.types';

export class PrismaTemplateMapper {

  static toPrisma(template: Template): Prisma.NotificationTemplateUncheckedCreateInput {  // ← MUDOU tipo
    return {
      id: template.id,
      template_name: template.templateName,
      notification_type: template.notificationType as unknown as PrismaType,
      channel: template.channel as unknown as PrismaChannel,
      subject_template: template.subjectTemplate,
      body_template: template.bodyTemplate,
    };
  }

  static toDomain(prisma: PrismaTemplate): Template {
    const props: TemplateProps = {
      id: prisma.id,
      templateName: prisma.template_name,
      notificationType: prisma.notification_type as unknown as DomainType,
      channel: prisma. channel as unknown as DomainChannel,
      subjectTemplate: prisma.subject_template,
      bodyTemplate: prisma.body_template,
      createdAt: prisma.created_at,
      updatedAt: prisma. updated_at,
    };

    return TemplateFactory.reconstitute(props);
  }

  static toDomainList(prismaList: PrismaTemplate[]): Template[] {
    return prismaList.map(p => this.toDomain(p));
  }
}