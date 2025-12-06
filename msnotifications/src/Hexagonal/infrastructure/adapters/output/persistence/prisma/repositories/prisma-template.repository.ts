import { Injectable } from '@nestjs/common';
import { ITemplateRepository } from 'src/Hexagonal/domain/repositories/template-repository.interface';
import { PrismaClientSingleton } from '../prisma-client.singleton';
import { Template } from 'src/Hexagonal/domain/entities/template.entity';
import { PrismaTemplateMapper } from '../../mappers/prisma-template.mapper';
import { NotificationType } from 'src/Hexagonal/domain/enums/notification-type.enum';

@Injectable()
export class PrismaTemplateRepository implements ITemplateRepository {
  private prisma = PrismaClientSingleton.getInstance();

  async save(template: Template): Promise<void> {
    const prismaData = PrismaTemplateMapper.toPrisma(template);

    await this.prisma. notificationTemplate.upsert({
      where: { id: template. id },
      update: prismaData,
      create: prismaData,
    });
  }

  async findById(id: string): Promise<Template | null> {
    const prismaTemplate = await this.prisma.notificationTemplate.findUnique({
      where: { id },
    });

    if (!prismaTemplate) return null;

    return PrismaTemplateMapper.toDomain(prismaTemplate);
  }

  async findByName(templateName: string): Promise<Template | null> {
    const prismaTemplate = await this.prisma. notificationTemplate.findUnique({
      where: { template_name: templateName },
    });

    if (!prismaTemplate) return null;

    return PrismaTemplateMapper.toDomain(prismaTemplate);
  }

  async findAll(): Promise<Template[]> {
    const prismaTemplates = await this.prisma. notificationTemplate.findMany({
      orderBy: { created_at: 'desc' },
    });

    return PrismaTemplateMapper.toDomainList(prismaTemplates);
  }

  async findByType(notificationType: NotificationType): Promise<Template[]> {
    const prismaTemplates = await this.prisma.notificationTemplate.findMany({
      where: {
        notification_type: notificationType as any,
      },
      orderBy: { created_at: 'desc' },
    });

    return PrismaTemplateMapper.toDomainList(prismaTemplates);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationTemplate.delete({
      where: { id },
    });
  }
}