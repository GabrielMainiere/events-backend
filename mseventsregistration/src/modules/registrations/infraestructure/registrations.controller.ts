import { Controller } from '@nestjs/common'
import { EventPattern, GrpcMethod, Payload } from '@nestjs/microservices'
import { EVENTS_REGISTRATION_PATTERN } from 'src/core/constants'
import { ProcessPaymentUpdateUseCase } from '../application/usecases/process-payment-update.usecase'
import { GetRegistrationByUserAndEventUseCase } from '../application/usecases/get-registration-by-user-and-event.usecase'
import { GetRegistrationRequest } from '../application/dto/request/get-registration.request'
import { GetRegistrationResponse } from '../application/dto/response/get-registration.response'
import { CountRegistrationsUseCase } from '../application/usecases/count-registrations.usecase'
import { ProcessPaymentUpdateRequest } from '../application/dto/request/process-payment-update.request'

@Controller()
export class RegistrationsController {
  constructor(
    private readonly processPaymentUpdateUseCase: ProcessPaymentUpdateUseCase,
    private readonly getRegistrationByUserAndEventUseCase: GetRegistrationByUserAndEventUseCase,
    private readonly countRegistrationsUseCase: CountRegistrationsUseCase
  ) {}

  @EventPattern(EVENTS_REGISTRATION_PATTERN)
  async handleRegistrationEvent(@Payload() data: ProcessPaymentUpdateRequest) {
    const { userId, eventId, status } = data
    await this.processPaymentUpdateUseCase.execute(eventId, userId, status)
  }

  @GrpcMethod('EventRegistrationService', 'CountEventRegistrations')
  async countEventRegistrations(data: {
    eventId: string
  }): Promise<{ count: number }> {
    const { eventId } = data
    return this.countRegistrationsUseCase.execute(eventId)
  }

  @GrpcMethod('EventRegistrationPaymentsService', 'GetRegistration')
  async getRegistration(
    data: GetRegistrationRequest
  ): Promise<GetRegistrationResponse> {
    const { userId, eventId } = data
    return this.getRegistrationByUserAndEventUseCase.execute(eventId, userId)
  }
}
