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

  @Query(() => [UserPreferenceEntity], { name: 'userOptionalPreferences' })
  async findOptionalPreferences(@Args('user_id') user_id: string) {
    return this.userPreferenceService.findOptionalPreferences(user_id);
  }  

  @Mutation(() => UserPreferenceEntity)
  async upsertUserPreference(
    @Args('input') input: UpsertUserPreferenceInput,
  ) {
    return this.userPreferenceService.upsert(input);
  }

}