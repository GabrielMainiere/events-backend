import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RegistrationService } from './services/registrations.service';
import type { IPaymentUpdateRequest } from 'src/grpc/event-registration/interfaces/IPaymentUpdateRequest';
import { EVENTS_REGISTRATION_PATTERN } from 'src/core/constants';

@Controller()
export class RegistrationsController {
  constructor(private readonly registrationService: RegistrationService) {}

  @EventPattern(EVENTS_REGISTRATION_PATTERN)
  async handleRegistrationEvent(@Payload() data: IPaymentUpdateRequest) {
    await this.registrationService.receivePaymentUpdate(data);
  }
}
