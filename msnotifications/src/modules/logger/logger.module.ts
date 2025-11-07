import { Module } from '@nestjs/common';
import { RequestLogger } from './request-logger';
import { WorkerLogger } from './worker-logger';
import { UserPreferenceLogger } from './user-preference-logger';


@Module({
  providers: [
    RequestLogger,
    WorkerLogger,
    UserPreferenceLogger,
  ],
  exports: [
    RequestLogger,
    WorkerLogger,
    UserPreferenceLogger,
  ],
})
export class LoggerModule {}