import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RequiredRole } from 'src/auth/auth.decorators'
import { RolesEnum } from 'src/enum/roles'
import { Registration } from './object-types/registration.entity'
import { CreateRegistrationInput } from './input-types/create-registration.input'
import { CheckInRegistrationInput } from './input-types/check-in-registration.input'
import { EventWithUsers } from './object-types/eventWithUsers.entity'
import { QRCode } from './object-types/qrCode.entity'
import { GenerateQRCodeInput } from './input-types/generate-qrCode.input'
import { RegisterUseCase } from '../../application/usecases/register-user.usecase'
import { CheckinUseCase } from '../../application/usecases/check-in.usecase'
import { GetUsersOnEventUseCase } from '../../application/usecases/registered-users-on-event.usecase'

@Resolver(() => Registration)
export class RegistrationResolver {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly checkInUseCase: CheckinUseCase,
    private readonly getUsersOnEventUseCase: GetUsersOnEventUseCase
  ) {}

  @Mutation(() => Registration)
  async registerUser(
    @Args('data') data: CreateRegistrationInput
  ): Promise<Registration> {
    return this.registerUseCase.execute(data.userId, data.eventId)
  }

  @Mutation(() => Registration)
  async checkInUser(
    @Args('data') data: CheckInRegistrationInput
  ): Promise<Registration> {
    return this.checkInUseCase.execute(data.userId, data.eventId)
  }

  @Query(() => EventWithUsers)
  @RequiredRole(RolesEnum.Admin)
  async getAllUsersByEvent(
    @Args('eventId') eventId: string
  ): Promise<EventWithUsers> {
    return this.getUsersOnEventUseCase.execute(eventId)
  }

  @Query(() => QRCode)
  async generateCheckInQRCode(
    @Args('data') data: GenerateQRCodeInput
  ): Promise<QRCode> {
    return this.checkInUseCase.executeWithQrCode(data.userId, data.eventId)
  }
}
