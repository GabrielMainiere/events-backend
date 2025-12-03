import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { EventsRegistrationService } from './eventsRegistration.service';

@Controller()
export class EventRegistrationGrpcController {
  constructor(private readonly service: EventsRegistrationService) {}

  @GrpcMethod('EventRegistrationService', 'CountEventRegistrations')
  async countEventRegistrations(data: {
    eventId: string;
  }): Promise<{ count: number }> {
    return this.service.countEventRegistrations(data);
  }
}
