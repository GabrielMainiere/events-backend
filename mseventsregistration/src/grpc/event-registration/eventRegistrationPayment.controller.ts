import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { EventsRegistrationService } from '../event-registration/eventsRegistration.service';
import type { IGetRegistrationRequest } from './interfaces/IGetRegistrationRequest';
import type { IGetRegistrationResponse } from './interfaces/IGetRegistrationResponse';

@Controller()
export class EventRegistrationPaymentsGrpcController {
  constructor(private readonly service: EventsRegistrationService) {}

  @GrpcMethod('EventRegistrationPaymentsService', 'GetRegistration')
  async getRegistration(
    data: IGetRegistrationRequest
  ): Promise<IGetRegistrationResponse> {
    return this.service.getRegistration(data);
  }
}
