import { Controller } from '@nestjs/common';
import { EventPattern, GrpcMethod, Payload } from '@nestjs/microservices';
import { RegistrationService } from './services/registrations.service';
import type { IPaymentUpdateRequest } from 'src/modules/registrations/interfaces/IPaymentUpdateRequest';
import { EVENTS_REGISTRATION_PATTERN } from 'src/core/constants';
import type { IGetRegistrationRequest } from './interfaces/IGetRegistrationRequest';
import type { IGetRegistrationResponse } from './interfaces/IGetRegistrationResponse';

@Controller()
export class RegistrationsController {
  constructor(private readonly registrationService: RegistrationService) {}

  @EventPattern(EVENTS_REGISTRATION_PATTERN)
  async handleRegistrationEvent(@Payload() data: IPaymentUpdateRequest) {
    await this.registrationService.receivePaymentUpdate(data);
  }

  @GrpcMethod('EventRegistrationService', 'CountEventRegistrations')
  async countEventRegistrations(data: {
    eventId: string;
  }): Promise<{ count: number }> {
    return this.registrationService.countEventRegistrations(data);
  }

  @GrpcMethod('EventRegistrationPaymentsService', 'GetRegistration')
  async getRegistration(
    data: IGetRegistrationRequest
  ): Promise<IGetRegistrationResponse> {
    return this.registrationService.getRegistration(data);
  }
}
