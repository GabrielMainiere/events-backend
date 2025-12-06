import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProcessNotificationUseCase } from 'src/Hexagonal/application/use-cases/notifications/process-notification.use-case';
import { NotificationProcessorService } from 'src/Hexagonal/domain/services/notification-processor.service';
import { TemplateRenderingService } from 'src/Hexagonal/domain/services/template-rendering.service';
import { UserPreferencePermissionService } from 'src/Hexagonal/domain/services/user-preference-permission.service';
import { PrismaNotificationRepository } from '../adapters/output/persistence/prisma/repositories/prisma-notification.repository';
import { PrismaTemplateRepository } from '../adapters/output/persistence/prisma/repositories/prisma-template.repository';
import { PrismaUserPreferenceRepository } from '../adapters/output/persistence/prisma/repositories/prisma-user-preference.repository';
import { NodemailerEmailGateway } from '../adapters/input/email/nodemailer-email.gateway';
import { EmailStrategy } from '../adapters/output/notification-channels/strategies/email.strategy';
import { SMSStrategy } from '../adapters/output/notification-channels/strategies/sms.strategy';
import { PushStrategy } from '../adapters/output/notification-channels/strategies/push.strategy';
import { NOTIFICATION_STRATEGIES, StrategyFactory } from '../adapters/output/notification-channels/strategy.factory';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    ProcessNotificationUseCase,

    {
      provide: NotificationProcessorService,
      useFactory: (templateRenderingService: TemplateRenderingService) => {
        return new NotificationProcessorService(templateRenderingService);
      },
      inject: [TemplateRenderingService],
    },
    UserPreferencePermissionService,
    TemplateRenderingService,

    {
      provide: 'INotificationRepository',
      useClass: PrismaNotificationRepository,
    },
    {
      provide: 'ITemplateRepository',
      useClass: PrismaTemplateRepository,
    },
    {
      provide: 'IUserPreferenceRepository',
      useClass: PrismaUserPreferenceRepository,
    },

    {
      provide: 'IEmailGateway',
      useClass: NodemailerEmailGateway,
    },

    EmailStrategy,
    SMSStrategy,
    PushStrategy,

    {
      provide: NOTIFICATION_STRATEGIES,
      useFactory: (
        emailStrategy: EmailStrategy,
        smsStrategy: SMSStrategy,
        pushStrategy: PushStrategy,
      ) => {
        return [emailStrategy, smsStrategy, pushStrategy];
      },
      inject: [EmailStrategy, SMSStrategy, PushStrategy],
    },
    {
      provide: 'IStrategyFactory',
      useClass: StrategyFactory,
    },
  ],
  exports: [
    ProcessNotificationUseCase,
    'IStrategyFactory',
  ],
})
export class NotificationModule {}