import { Module } from '@nestjs/common';
import { NotificationLogModule } from 'src/modules/notification-log/notification-log.module';
import { NotificationTemplateModule } from 'src/modules/notification-template/notification-template.module';
import { NotificationImplementation } from './notification.implementation';
import { UserPreferenceModule } from '../user-preference/user-preference.module';
import { DecoratorModule } from '../decorator/decorator.module';


@Module({
  imports: [
    NotificationLogModule, 
    NotificationTemplateModule,
    UserPreferenceModule,
    DecoratorModule,
  ],
  controllers: [NotificationImplementation],
})
export class NotificationImplementationModule {}