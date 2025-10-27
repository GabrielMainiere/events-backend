import { Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Client } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc/grpcClientOptions';
import { IEventNotificationRequest } from '../interfaces/IEventRegistrationRequest';
import { IEventRegistrationService } from '../interfaces/IEventRegistrationService';

@Injectable()
export class EventRegistrationClient implements OnModuleInit {
    
  @Client(grpcClientOptions)
  private client: ClientGrpc;

  private service: IEventRegistrationService;

  onModuleInit() {
    this.service = this.client.getService<IEventRegistrationService>('EventRegistrationService');
  }

  notifyEventCreated(data: IEventNotificationRequest) {
    return this.service.notifyEventCreated(data);
  }

  notifyEventUpdated(data: IEventNotificationRequest) {
    return this.service.notifyEventUpdated(data);
  }

  notifyEventCancelled(data: IEventNotificationRequest) {
    return this.service.notifyEventCancelled(data);
  }
}
