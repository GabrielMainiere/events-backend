import { Module } from '@nestjs/common';
import { NotificationTemplateService } from './notification-template.service';
import { NotificationTemplateResolver } from './notification-resolver-template.service';
import { NotificationTemplateValidator } from './notification-template-validator';
import { NotificationTemplateRepository } from './notification-template.repository';
import { NotificationTemplateResolver as GraphQLResolver } from './notification-template.resolver';
import { TemplateProcessorModule } from '../strategy/template-processor/template-processor.module';
import { LoggerModule } from '../logger/logger.module';
import { DecoratorModule } from '../decorator/decorator.module';

@Module({
  imports: [
    DecoratorModule,
    TemplateProcessorModule,
    LoggerModule,
  ],
  providers: [
    NotificationTemplateRepository,
    {
      provide: 'INotificationTemplateRepository',
      useClass: NotificationTemplateRepository,
    },
    NotificationTemplateService,
    NotificationTemplateValidator,
    NotificationTemplateResolver,
    GraphQLResolver,
  ],
  exports: [
    'INotificationTemplateRepository',
    NotificationTemplateService,
    NotificationTemplateValidator,
    NotificationTemplateResolver,
  ],
})
export class NotificationTemplateModule {}