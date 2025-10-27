import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { FactoryModule } from 'src/modules/factory/factory.module';

@Module({
  imports: [
    FactoryModule
  ],
  providers: [WorkerService],
})
export class WorkerModule {}