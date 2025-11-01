import { Module } from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceResolver } from './user-preference.resolver';
import { UserPreferenceRepository } from './user-preference.repository';
import { PrismaModule } from 'src/prisma-ds/prisma.module';
import { UserPreferenceLogDecorator } from '../decorator/user-preference-log.decorator';
import { DecoratorModule } from '../decorator/decorator.module';

@Module({
  imports: [
    PrismaModule,
    DecoratorModule,
  ],
  providers: [
    UserPreferenceRepository,
    UserPreferenceService,
    UserPreferenceResolver,
  ],
  exports: [
    UserPreferenceService,
  ],
})
export class UserPreferenceModule {}