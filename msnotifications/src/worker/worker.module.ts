import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { FactoryModule } from 'src/modules/factory/factory.module';
import { NotificationLogModule } from 'src/modules/notification-log/notification-log.module';
import { DecoratorModule } from 'src/modules/decorator/decorator.module';

@Module({
  imports: [
    FactoryModule,
    NotificationLogModule, 
    WorkerModule,
    DecoratorModule, 
  ],
  providers: [WorkerService],
})
export class WorkerModule {}