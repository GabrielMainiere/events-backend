import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Registration } from './entities/registration.entity';
import { CreateRegistrationInput } from './dto/create-registration.input';
import { CheckInRegistrationInput } from './dto/check-in-registration.input';
import { RegistrationService } from './services/registrations.service';
import { EventWithUsers } from './entities/eventWithUsers.entity';
import { QRCode } from './entities/qrCode.entity';
import { GenerateQRCodeInput } from './dto/generate-qrCode.input';
import { RequiredRole } from 'src/auth/auth.decorators'
import { RolesEnum } from 'src/enum/roles'

@Resolver(() => Registration)
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  @Mutation(() => Registration)
  async registerUser(
    @Args('data') data: CreateRegistrationInput,): Promise<Registration> {
      return this.registrationService.registerUser(data.userId, data.eventId);
  }

  @Mutation(() => Registration)
  async checkInUser(
    @Args('data') data: CheckInRegistrationInput,
  ): Promise<Registration> {
    return this.registrationService.checkInUser(data.userId, data.eventId);
  }

  @Query(() => EventWithUsers)
  @RequiredRole(RolesEnum.Admin)
  async getAllUsersByEvent(@Args('eventId') eventId: string): Promise<EventWithUsers> {
    return this.registrationService.getAllUsersByEvent(eventId);
  }

  @Query(() => QRCode)
  async generateCheckInQRCode(
    @Args('data') data: GenerateQRCodeInput,
  ): Promise<QRCode> {
    return this.registrationService.generateCheckInQRCode(data.userId, data.eventId);
  }
}
