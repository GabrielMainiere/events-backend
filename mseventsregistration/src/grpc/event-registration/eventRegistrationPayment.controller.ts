import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { EventsRegistrationService } from "../event-registration/eventsRegistration.service";
import type { IGetRegistrationRequest } from "./interfaces/IGetRegistrationRequest";
import type { IGetRegistrationResponse } from "./interfaces/IGetRegistrationResponse";
import type { IPaymentUpdateRequest } from "./interfaces/IPaymentUpdateRequest";
import { IPaymentUpdateResponse } from "./interfaces/IPaymentUpdateResponse";

@Controller()
export class EventRegistrationPaymentsGrpcController {
  constructor(private readonly service: EventsRegistrationService) {}

  @GrpcMethod('EventRegistrationPaymentsService', 'GetRegistration')
  async getRegistration(data: IGetRegistrationRequest): Promise<IGetRegistrationResponse> {
    return this.service.getRegistration(data);
  }

  @GrpcMethod('EventRegistrationPaymentsService', 'ReceivePaymentUpdate')
  async receivePaymentUpdate(data: IPaymentUpdateRequest): Promise<IPaymentUpdateResponse> {
    return this.service.receivePaymentUpdate(data);
  }
}
