import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceEntity } from 'src/common/entities/user-preference.entity';
import { UpsertUserPreferenceInput } from 'src/common/dto/upsertUserPreference.input';
import { NotificationTypeHelper } from 'src/common/helper/notification-type.helper';
import { NotificationType } from 'src/common/enum/notification-type.enum';


@Resolver(() => UserPreferenceEntity)
export class UserPreferenceResolver {

  constructor(
    private readonly userPreferenceService: UserPreferenceService,
  ) {}

  @Query(() => [UserPreferenceEntity], { name: 'userOptionalPreferences' })
  async findOptionalPreferences(@Args('user_id') user_id: string) {
    return this.userPreferenceService.findOptionalPreferences(user_id);
  }  

  @Query(() => [NotificationType], { name: 'optionalNotificationTypes' })
  getOptionalTypes(): NotificationType[] {
    return NotificationTypeHelper.getOptionalTypes();
  }

  @Mutation(() => UserPreferenceEntity)
  async upsertUserPreference(
    @Args('input') input: UpsertUserPreferenceInput,
  ) {
    return this.userPreferenceService.upsert(input);
  }

  @Mutation(() => Boolean)
  async deleteUserPreferences(@Args('user_id') user_id: string) {
    await this.userPreferenceService.deleteByUserId(user_id);
    return true;
  }

}