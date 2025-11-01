
import { Module } from '@nestjs/common';
import { NotificationLogModule } from 'src/modules/notification-log/notification-log.module';
import { NotificationTemplateModule } from 'src/modules/notification-template/notification-template.module';
import { NotificationImplementation } from './notification.implementation.controller';
import { UserPreferenceModule } from '../user-preference/user-preference.module';
import { DecoratorModule } from '../decorator/decorator.module';
import { NotificationProcessorService } from './notification-processor.service';
import { NotificationEnqueuer } from './notification-enqueuer';
import { PayloadHelper } from '../../common/helper/payload.helper';

@Module({
  imports: [
    NotificationLogModule, 
    NotificationTemplateModule,
    UserPreferenceModule,
    DecoratorModule,
  ],
  controllers: [NotificationImplementation],
  providers: [
    NotificationProcessorService,
    NotificationEnqueuer,
    PayloadHelper,
  ],
})
export class NotificationImplementationModule {}