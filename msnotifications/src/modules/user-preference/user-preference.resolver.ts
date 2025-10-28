import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceEntity } from 'src/entities/user-preference.entity';
import { UpsertUserPreferenceInput } from 'src/dto/upsertUserPreference.input';
import { Logger } from '@nestjs/common';


@Resolver(() => UserPreferenceEntity)
export class UserPreferenceResolver {
  private readonly logger = new Logger(UserPreferenceResolver.name);

  constructor(
    private readonly userPreferenceService: UserPreferenceService,
  ) {}

  @Mutation(() => UserPreferenceEntity)
  async upsertUserPreference(
    @Args('input') input: UpsertUserPreferenceInput,
  ) {

    return this.userPreferenceService.upsert(input);
  }

}