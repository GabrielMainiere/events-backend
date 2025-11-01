import { Module } from '@nestjs/common';

import { FactoryModule } from 'src/modules/factory/factory.module';
import { NotificationLogModule } from 'src/modules/notification-log/notification-log.module';
import { DecoratorModule } from 'src/modules/decorator/decorator.module';
import { WorkerScheduler } from './worker-schedule.service';
import { NotificationBatchProcessor } from './notification-batch-processor';
import { NotificationProcessor } from './notification-processor';
import { NotificationStatusUpdater } from './notification-status-updater.service';
import { NotificationSender } from './notification-sender';

@Module({
  imports: [
    FactoryModule,
    NotificationLogModule,
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