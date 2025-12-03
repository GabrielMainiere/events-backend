import { Module } from '@nestjs/common';
import { NotificationSender } from './notification-sender';
import { StrategyFactoryModule } from 'src/modules/factory/strategy-factory.module';
import { NotificationTemplateModule } from 'src/modules/notification-template/notification-template.module';

@Module({
  imports: [
    StrategyFactoryModule,
    NotificationTemplateModule,
  ],
  providers: [NotificationSender],
  exports: [NotificationSender],
})
export class NotificationSenderModule {}