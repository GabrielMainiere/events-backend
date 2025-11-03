import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { EventsRegistrationService } from "../event-registration/eventsRegistration.service";
import type { IGetEventByIdRequest } from "./interfaces/IGetEventByIdRequest";
import type { IGetEventByIdResponse } from "./interfaces/IGetEventByIdResponse";
import type { IPaymentUpdateRequest } from "./interfaces/IPaymentUpdateRequest";
import { IPaymentUpdateResponse } from "./interfaces/IPaymentUpdateResponse";

@Controller()
export class EventRegistrationPaymentsGrpcController {
  constructor(private readonly service: EventsRegistrationService) {}

  @GrpcMethod('EventRegistrationPaymentsService', 'GetEventById')
  async getEventById(data: IGetEventByIdRequest): Promise<IGetEventByIdResponse> {
    return this.service.getEventById({ id: data.id });
  }

  @GrpcMethod('EventRegistrationPaymentsService', 'ReceivePaymentUpdate')
  async receivePaymentUpdate(data: IPaymentUpdateRequest): Promise<IPaymentUpdateResponse> {
    return this.service.receivePaymentUpdate(data);
  }
}
