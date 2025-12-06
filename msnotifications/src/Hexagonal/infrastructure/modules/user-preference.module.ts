import { Module } from '@nestjs/common';
import { GetUserPreferencesUseCase } from 'src/Hexagonal/application/use-cases/user-preferences/get-user-preference.use-case';
import { UpsertUserPreferenceUseCase } from 'src/Hexagonal/application/use-cases/user-preferences/upsert-user-preference.use-case';
import { PrismaUserPreferenceRepository } from '../adapters/output/persistence/prisma/repositories/prisma-user-preference.repository';

@Module({
  providers: [
    UpsertUserPreferenceUseCase,
    GetUserPreferencesUseCase,

    {
      provide: 'IUserPreferenceRepository',
      useClass: PrismaUserPreferenceRepository,
    },
  ],
  exports: [
    UpsertUserPreferenceUseCase,
    GetUserPreferencesUseCase,
  ],
})
export class UserPreferenceModule {}