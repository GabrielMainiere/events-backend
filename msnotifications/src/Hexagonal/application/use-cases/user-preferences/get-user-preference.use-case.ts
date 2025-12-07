import { Inject, Injectable } from '@nestjs/common';
import { UserPreferenceMapper } from '../../mappers/user-preference.mapper';
import type { IUserPreferenceRepository } from '../../../domain/repositories/user-preference-repository.interface';
import { IGetUserPreferences } from '../../ports/input/user-preferences/get-user-preferences.port';
import { UserPreferenceResponse } from '../../dtos/user-preferences/user-preference.response';

@Injectable()
export class GetUserPreferencesUseCase implements IGetUserPreferences {
  
  constructor(
    @Inject('IUserPreferenceRepository')
    private readonly userPrefRepo: IUserPreferenceRepository,
  ) {}

  async execute(userId: string): Promise<UserPreferenceResponse[]> {
    const preferences = await this. userPrefRepo.findByUserId(userId);
    return UserPreferenceMapper.entityListToResponseList(preferences);
  }
}