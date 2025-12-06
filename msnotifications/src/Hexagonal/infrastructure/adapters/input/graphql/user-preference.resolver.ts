import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserPreferenceType } from './types/user-preference.type';
import { UpsertUserPreferenceUseCase } from 'src/Hexagonal/application/use-cases/user-preferences/upsert-user-preference.use-case';
import { GetUserPreferencesUseCase } from 'src/Hexagonal/application/use-cases/user-preferences/get-user-preference.use-case';
import { UpsertUserPreferenceCommand } from 'src/Hexagonal/application/dtos/user-preferences/upsert-user-preference.command';
import { UpsertUserPreferenceInput } from './input/upsert-user-preference.input';

@Resolver(() => UserPreferenceType)
export class UserPreferenceResolver {
  constructor(
    private readonly upsertUserPreferenceUseCase: UpsertUserPreferenceUseCase,
    private readonly getUserPreferencesUseCase: GetUserPreferencesUseCase,
  ) {}

  @Query(() => [UserPreferenceType], { description: 'Get user preferences by userId' })
  async userPreferences(
    @Args('userId') userId: string,
  ): Promise<UserPreferenceType[]> {
    const responses = await this.getUserPreferencesUseCase.execute(userId);
    return responses.map(r => this.mapToGraphQLType(r));
  }


  @Mutation(() => UserPreferenceType, { description: 'Upsert user preference' })
  async upsertUserPreference(
    @Args('input') input: UpsertUserPreferenceInput,
  ): Promise<UserPreferenceType> {
    const command = new UpsertUserPreferenceCommand(
      input.userId,
      input.notificationType,
      input.channel,
      input.isEnabled,
    );

    const response = await this.upsertUserPreferenceUseCase.execute(command);
    return this. mapToGraphQLType(response);
  }

  private mapToGraphQLType(response: any): UserPreferenceType {
    return {
      id: response.id,
      userId: response.userId,
      notificationType: response.notificationType,
      channel: response.channel,
      isEnabled: response. isEnabled,
      updatedAt: response.updatedAt,
    };
  }
}