import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Registration } from './entities/registration.entity';
import { CreateRegistrationInput } from './dto/create-registration.input';
import { RegistrationService } from './services/registrations.service';

@Resolver(() => Registration)
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  @Mutation(() => Registration)
  async registerUser(
    @Args('data') data: CreateRegistrationInput,): Promise<Registration> {
      return this.registrationService.registerUser(data.userId, data.eventId);
  }

  @Query(() => String)
  healthCheck(): string {
    return 'OK';
  }
}
