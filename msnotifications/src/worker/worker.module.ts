import { Module } from '@nestjs/common';
import { StrategyFactoryModule } from 'src/modules/factory/strategy-factory.module';
import { NotificationLogModule } from 'src/modules/notification-log/notification-log.module';
import { NotificationTemplateModule } from 'src/modules/notification-template/notification-template.module';
import { DecoratorModule } from 'src/modules/decorator/decorator.module';
import { WorkerScheduler } from './worker-schedule';
import { NotificationBatchProcessor } from './notification-batch-processor';
import { NotificationProcessor } from './notification-processor';
import { NotificationStatusUpdater } from './notification-status-updater';
import { NotificationSender } from './notification-sender';
import { LoggerModule } from 'src/modules/logger/logger.module';

@Module({
  imports: [
    StrategyFactoryModule,
    NotificationLogModule,
    NotificationTemplateModule,
    DecoratorModule,
    LoggerModule,
  ],
  providers: [
    WorkerScheduler,
    NotificationBatchProcessor,
    {
      provide: 'INotificationProcessor',
      useClass: NotificationProcessor,
    },
    {
      provide: 'INotificationStatusUpdater',
      useClass: NotificationStatusUpdater,
    },
    {
      provide: 'INotificationSender',
      useClass: NotificationSender,
    },
  ],
})
export class WorkerModule {}