import { Module } from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceResolver } from './user-preference.resolver';
import { UserPreferenceRepository } from './user-preference.repository';
import { UserPreferenceValidator } from './user-preference-validator';
import { UserPreferencePermissionChecker } from './user-preference-permission-checker';
import { UserPreferenceLazy } from './user-preference-lazy';
import { LoggerModule } from '../logger/logger.module';
import { DecoratorModule } from '../decorator/decorator.module';

@Module({
  imports: [
    DecoratorModule,
    LoggerModule,
  ],
  providers: [
    UserPreferenceRepository,
    {
      provide: 'IUserPreferenceRepository',
      useClass: UserPreferenceRepository,
    },
    UserPreferenceService,
    UserPreferenceValidator,
    UserPreferencePermissionChecker,
    UserPreferenceLazy,
    UserPreferenceResolver,
  ],
  exports: [
    'IUserPreferenceRepository',
    UserPreferenceService,
  ],
})
export class UserPreferenceModule {}