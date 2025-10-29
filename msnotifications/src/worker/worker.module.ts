import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { FactoryModule } from 'src/modules/factory/factory.module';
import { NotificationLogModule } from 'src/modules/notification-log/notification-log.module';

@Module({
  imports: [
    FactoryModule,
    NotificationLogModule, 
  ],
  providers: [WorkerService],
})
export class WorkerModule {}