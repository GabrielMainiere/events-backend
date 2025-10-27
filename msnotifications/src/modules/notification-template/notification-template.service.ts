import { Injectable, NotFoundException } from '@nestjs/common';
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
}