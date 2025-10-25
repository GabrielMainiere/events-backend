import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-ds/prisma.service';


@Injectable()
export class NotificationTemplateService {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(template_name: string) {
    return this.prisma.notificationTemplate.findUnique({
      where: { template_name },
    });
  }
}