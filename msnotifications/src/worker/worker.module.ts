import { Module } from '@nestjs/common';
import { NotificationStrategyProviderModule } from 'src/modules/strategy/strategy-provider/notification-strategy-provider.module';
import { NotificationLogModule } from 'src/modules/notification-log/notification-log.module';
import { NotificationTemplateModule } from 'src/modules/notification-template/notification-template.module';
import { DecoratorModule } from 'src/modules/decorator/decorator.module';
import { WorkerScheduler } from './worker-schedule';
import { NotificationBatchProcessor } from './notification-batch-processor';
import { NotificationProcessor } from './notification-processor';
import { NotificationStatusUpdater } from './notification-status-updater';
import { NotificationSender } from './notification-sender';

@Module({
  imports: [
    NotificationStrategyProviderModule,
    NotificationLogModule,
    NotificationTemplateModule,
    DecoratorModule,
  ],
  providers: [
    WorkerScheduler,               
    NotificationBatchProcessor,     
    NotificationProcessor,          
    NotificationStatusUpdater,     
    NotificationSender,            
  ],
})
export class WorkerModule {}