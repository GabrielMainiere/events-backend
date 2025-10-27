import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma-ds/prisma.module';
import { NotificationLogModule } from './modules/notification-log/notification-log.module';
import { NotificationTemplateModule } from './modules/notification-template/notification-template.module';
import { NotificationImplementationModule } from './modules/notification-implementation/notification.module';
import { WorkerModule } from './worker/worker.module';
import { EmailModule } from './modules/email/email.module';
import { StrategyModule } from './modules/strategy/strategy.module';
import { FactoryModule } from './modules/factory/factory.module';
import { DecoratorModule } from './modules/decorator/decorator.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

// Importar os enums para registrá-los no GraphQL
import './enum/notification-channel.enum';
import './enum/notification-type.enum';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule, 
    NotificationLogModule,
    NotificationTemplateModule,
    EmailModule,
    NotificationImplementationModule,
    WorkerModule,
    StrategyModule,
    FactoryModule,
    DecoratorModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}