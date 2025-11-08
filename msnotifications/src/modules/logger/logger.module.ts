import { Module } from '@nestjs/common';
import { RequestLogger } from './request-logger';
import { WorkerLogger } from './worker-logger';
import { UserPreferenceLogger } from './user-preference-logger';

@Module({
  providers: [
    {
      provide: 'IRequestLogger',
      useClass: RequestLogger,
    },
    {
      provide: 'IWorkerLogger',
      useClass: WorkerLogger,
    },
    {
      provide: 'IUserPreferenceLogger',
      useClass: UserPreferenceLogger,
    },
  ],
  exports: [
    'IRequestLogger',
    'IWorkerLogger',
    'IUserPreferenceLogger',
  ],
})
export class LoggerModule {}