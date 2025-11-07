import { OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { join } from 'path';
import { environment } from 'src/core/environment';
import { NotificationResponseDto } from '../dto/notification-response.dto';
import { Observable } from 'rxjs';
import { INotificationsClientService } from '../interfaces/iNotificationService';
import { SendEventNotificationDto } from '../dto/send-event-notification.dto';


export class NotificationsClientService implements INotificationsClientService, OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'notifications',
      protoPath: join(__dirname, '../../../../proto/notifications.proto'),
      url: environment.notificationsGrpcUrl,
    },
  })
  private client: ClientGrpc;
  private service: INotificationsClientService;

  onModuleInit() {
    this.service = this.client.getService<INotificationsClientService>('NotificationService');
  }

  async sendEventNotification(
    data: SendEventNotificationDto
  ): Promise<Observable<NotificationResponseDto>> {
    const resp = await this.service.sendEventNotification(data);
    resp.subscribe();
    return resp;
  }
}