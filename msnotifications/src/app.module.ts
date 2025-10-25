import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma-ds/prisma.module';
import { NotificationLogModule } from './notification-log/notification-log.module';
import { NotificationTemplateModule } from './notification-template/notification-template.module';
import { NotificationImplementationModule } from './notification-implementation/notification.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule, 
    NotificationLogModule,
    NotificationTemplateModule,
    NotificationImplementationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}