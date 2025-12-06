import { Inject, Injectable, Logger } from '@nestjs/common';

import { UserPreferenceMapper } from '../../mappers/user-preference.mapper';
import { UserPreferenceFactory } from '../../../domain/factories/user-preference.factory';
import type { IUserPreferenceRepository } from '../../../domain/repositories/user-preference-repository.interface';
import { IUpsertUserPreference } from '../../ports/input/user-preferences/upsert-user-preference.port';
import { UpsertUserPreferenceCommand } from '../../dtos/user-preferences/upsert-user-preference.command';
import { UserPreferenceResponse } from '../../dtos/user-preferences/user-preference.response';

@Injectable()
export class UpsertUserPreferenceUseCase implements IUpsertUserPreference {
  private readonly logger = new Logger(UpsertUserPreferenceUseCase.name);

  constructor(
    @Inject('IUserPreferenceRepository')
    private readonly userPrefRepo: IUserPreferenceRepository,
  ) {}

  async execute(command: UpsertUserPreferenceCommand): Promise<UserPreferenceResponse> {
    const existing = await this.userPrefRepo.findByUserAndTypeAndChannel(
      command.userId,
      command.notificationType,
      command.channel,
    );

    let preference;

    if (existing) {
      this.logger.log(`Updating preference: ${existing.id}`);
      UserPreferenceMapper.applyUpsertCommand(existing, command);
      preference = existing;
      
    } else {
      this.logger.log(`Creating preference for user: ${command.userId}`);
      const props = UserPreferenceMapper. commandToDomainProps(command);
      preference = UserPreferenceFactory.create(props);
    }

    await this.userPrefRepo.save(preference);

    this.logger.log(
      `Preference saved | userId: ${preference.userId}, type: ${preference. notificationType}, enabled: ${preference.isEnabled}`
    );

    return UserPreferenceMapper.entityToResponse(preference);
  }
}