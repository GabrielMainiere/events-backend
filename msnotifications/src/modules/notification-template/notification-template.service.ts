import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateInput } from 'src/dto/createNotificationTemplate.input';
import { UpdateTemplateInput } from 'src/dto/updateNotificationTemplate.input';
import { PrismaService } from 'src/prisma-ds/prisma.service';


@Injectable()
export class NotificationTemplateService {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(template_name: string) {
    return this.prisma.notificationTemplate.findUnique({
      where: { template_name },
    });
  }

  async findAll() {
    return this.prisma.notificationTemplate.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    const template = await this.prisma.notificationTemplate.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException(`Template com ID "${id}" não encontrado`);
    }

    return template;
  }

    async create(data: CreateTemplateInput) {

    const existing = await this.findByName(data.template_name);
    if (existing) {
      throw new ConflictException(
        `Template com nome "${data.template_name}" já existe`,
      );
    }

    return this.prisma.notificationTemplate.create({
      data: {
        template_name: data.template_name,
        channel: data.channel,
        subject_template: data.subject_template,
        body_template: data.body_template,
      },
    });
  }

    async update(id: string, data: UpdateTemplateInput) {
    await this.findOne(id);

    if (data.template_name) {
      const existing = await this.findByName(data.template_name);
      if (existing && existing.id !== id) {
        throw new ConflictException(
          `Já existe outro template com nome "${data.template_name}"`,
        );
      }
    }

    return this.prisma.notificationTemplate.update({
      where: { id },
      data: {
        template_name: data.template_name,
        channel: data.channel,
        subject_template: data.subject_template,
        body_template: data.body_template,
      },
    });
  }
  
  async remove(id: string) {
    const template = await this.prisma.notificationTemplate.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException(`Template com ID "${id}" não encontrado`);
    }
    
    return this.prisma.notificationTemplate.delete({
      where: { id },
    });
  }
}