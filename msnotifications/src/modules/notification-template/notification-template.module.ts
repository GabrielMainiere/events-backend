import { Module } from '@nestjs/common';
import { NotificationTemplateService } from './notification-template.service';
import { NotificationTemplateResolver } from './notification-resolver-template.service';
import { TemplateProcessorModule } from '../notification-template-processor/template-processor.module';
import { NotificationTemplateRepository } from './notification-template.repository';
import { NotificationTemplateResolver as GraphQLResolver } from './notification-template.resolver'; 
import { NotificationTemplateValidator } from './validator/notification-template-validator';
import { LoggerModule } from '../logger/logger.module';
import { DecoratorModule } from '../decorator/decorator.module';

@Module({
  imports: [DecoratorModule, TemplateProcessorModule, LoggerModule],
  providers: [
    NotificationTemplateRepository,
    {
      provide: 'INotificationTemplateRepository',
      useClass: NotificationTemplateRepository,
    },
    {
      provide: 'INotificationTemplateService',
      useClass: NotificationTemplateService,
    },
    {
      provide: 'INotificationTemplateValidator',
      useClass: NotificationTemplateValidator,
    },
    {
      provide: 'INotificationTemplateResolver',
      useClass: NotificationTemplateResolver,
    },
    GraphQLResolver,
  ],
  exports: [
    'INotificationTemplateRepository',
    'INotificationTemplateService',
    'INotificationTemplateValidator',
    'INotificationTemplateResolver', 
  ],
})
export class NotificationTemplateModule {}