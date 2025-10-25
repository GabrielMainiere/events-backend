import { Module, Logger } from '@nestjs/common';
import { LogNotificationDecorator } from './log.decorator';

@Module({
  providers: [LogNotificationDecorator, Logger],
  exports: [LogNotificationDecorator],
})
export class DecoratorModule {}