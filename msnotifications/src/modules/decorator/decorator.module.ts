import { Module } from '@nestjs/common';
import { AuditLogDecorator } from './audit-log.decorator';
import { PerformanceLogDecorator } from './performance-log.decorator';
import { RequestLogDecorator } from './request-log.decorator';
import { WorkerLogDecorator } from './worker-log.decorator';
import { UserPreferenceLogDecorator } from './user-preference-log.decorator';


@Module({
  providers: [
    AuditLogDecorator,
    PerformanceLogDecorator,
    WorkerLogDecorator,
    RequestLogDecorator,
    UserPreferenceLogDecorator,
  ],
  exports: [
    AuditLogDecorator,
    PerformanceLogDecorator,
    WorkerLogDecorator,
    RequestLogDecorator,
    UserPreferenceLogDecorator,
  ],
})
export class DecoratorModule {}