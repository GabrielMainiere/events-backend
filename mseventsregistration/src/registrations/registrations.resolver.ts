import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RegistrationsService } from './services/registrations.service';
import { Registration } from './entities/registration.entity';
import { CreateRegistrationInput } from './dto/create-registration.input';
import { UpdateRegistrationInput } from './dto/update-registration.input';

@Resolver(() => Registration)
export class RegistrationsResolver {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Mutation(() => Registration)
  createRegistration(@Args('createRegistrationInput') createRegistrationInput: CreateRegistrationInput) {
    return this.registrationsService.create(createRegistrationInput);
  }

  @Query(() => [Registration], { name: 'registrations' })
  findAll() {
    return this.registrationsService.findAll();
  }

  @Query(() => Registration, { name: 'registration' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.registrationsService.findOne(id);
  }

  @Mutation(() => Registration)
  updateRegistration(@Args('updateRegistrationInput') updateRegistrationInput: UpdateRegistrationInput) {
    return this.registrationsService.update(updateRegistrationInput.id, updateRegistrationInput);
  }

  @Mutation(() => Registration)
  removeRegistration(@Args('id', { type: () => Int }) id: number) {
    return this.registrationsService.remove(id);
  }
}
