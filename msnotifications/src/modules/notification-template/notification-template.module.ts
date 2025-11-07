import { Module } from '@nestjs/common';
import { NotificationTemplateService } from './notification-template.service';
import { NotificationTemplateResolver } from './notification-resolver-template.service';
import { NotificationTemplateValidator } from './notification-template-validator';
import { NotificationTemplateRepository } from './notification-template.repository';
import { NotificationTemplateResolver as GraphQLResolver } from './notification-template.resolver';
import { PrismaModule } from 'src/prisma-ds/prisma.module';
import { DecoratorModule } from '../decorator/decorator.module';
import { TemplateProcessorModule } from '../strategy/template-processor/template-processor.module';


@Module({
  imports: [
    PrismaModule,
    DecoratorModule,
    TemplateProcessorModule,
  ],
  providers: [
    NotificationTemplateRepository,
    NotificationTemplateService,
    NotificationTemplateValidator,
    NotificationTemplateResolver,
    GraphQLResolver,
  ],
  exports: [
    NotificationTemplateService,
    NotificationTemplateValidator,
    NotificationTemplateResolver
  ],
})
export class NotificationTemplateModule {}