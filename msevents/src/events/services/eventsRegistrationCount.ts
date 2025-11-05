import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { EventRegistrationClient } from 'src/grpc/clients/eventRegistrationClient';
import { IEventRegistrationCount } from 'src/grpc/interfaces/IEventRegistrationCount';

@Injectable()
export class EventRegistrationCount implements IEventRegistrationCount {
  constructor(private readonly grpcClient: EventRegistrationClient) {}

  async countEventRegistrations(data: { eventId: string }): Promise<{ count: number }> {
    try {
      const response = await lastValueFrom(
        this.grpcClient.countEventRegistrations(data)
      );
      return response;
    } catch (error) {
      console.error(`gRPC countEventRegistrations failed: ${error.message}`);
      return { count: 0 }; 
    }
  }
}
