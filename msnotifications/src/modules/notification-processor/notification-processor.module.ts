import { Module } from '@nestjs/common';
import { NotificationLogModule } from 'src/modules/notification-log/notification-log.module';
import { NotificationTemplateModule } from 'src/modules/notification-template/notification-template.module';
import { UserPreferenceModule } from '../user-preference/user-preference.module';
import { DecoratorModule } from '../decorator/decorator.module';

import { LoggerModule } from '../logger/logger.module';
import { StrategyFactoryModule } from '../factory/strategy-factory.module';
import { NotificationProcessorService } from './notification-processor.service';

@Module({
  imports: [
    NotificationLogModule,
    NotificationTemplateModule,
    UserPreferenceModule,
    DecoratorModule,
    LoggerModule,
    StrategyFactoryModule,
  ],
  providers: [
    NotificationProcessorService,
  ],
  exports: [
    NotificationProcessorService,
  ],
})
export class NotificationProcessorModule {}