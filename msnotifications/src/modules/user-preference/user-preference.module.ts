import { Module } from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceResolver } from './user-preference.resolver';
import { UserPreferenceRepository } from './user-preference.repository';
import { PrismaModule } from 'src/prisma-ds/prisma.module';
import { DecoratorModule } from '../decorator/decorator.module';
import { UserPreferenceValidator } from './user-preference-validator';
import { UserPreferencePermissionChecker } from './user-preference-permission-checker';
import { UserPreferenceLazy } from './user-preference-lazy';

@Module({
  imports: [
    PrismaModule,
    DecoratorModule,
  ],
  providers: [
    UserPreferenceRepository,
    UserPreferenceService,            
    UserPreferenceValidator,          
    UserPreferencePermissionChecker,  
    UserPreferenceLazy,            
    UserPreferenceResolver,
  ],
  exports: [
    UserPreferenceService,
  ],
})
export class UserPreferenceModule {}