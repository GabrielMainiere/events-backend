import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationLogModule } from './modules/notification-log/notification-log.module';
import { NotificationTemplateModule } from './modules/notification-template/notification-template.module';

import { EmailModule } from './modules/email/email.module';
import { StrategyModule } from './modules/strategy/strategy.module';
import { DecoratorModule } from './modules/decorator/decorator.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import './common/enum/notification-channel.enum';
import './common/enum/notification-type.enum';
import { UserPreferenceModule } from './modules/user-preference/user-preference.module';
import { HealthModule } from './common/health/health.module';
import { join } from 'path';
import { StrategyFactoryModule } from './modules/factory/strategy-factory.module';
import { authGuardProvider } from './modules/auth/auth.provider'
import { NotificationProcessorModule } from './modules/notification-processor/notification-processor.module';
import { NotificationSenderModule } from './modules/notification-sender/notification-sender.module';
import { RabbitMQConfig } from './rabbitMQ/config/rabbitMQ.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    NotificationLogModule,
    NotificationTemplateModule,
    EmailModule,
    NotificationProcessorModule,
    NotificationSenderModule,
    StrategyModule,
    StrategyFactoryModule,
    DecoratorModule,
    UserPreferenceModule,
    HealthModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
    }),
  ],
  controllers: [],
  providers: [authGuardProvider, RabbitMQConfig],
})
export class AppModule {}