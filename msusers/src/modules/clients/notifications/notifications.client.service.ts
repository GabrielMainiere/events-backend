import { OnModuleInit } from '@nestjs/common'
import { Client, ClientGrpc, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { environment } from 'src/core/environment'
import { INotificationsClientService } from './interfaces/INotificationsService'
import { SendAccountNotificationDto } from './dto/send-account-notification.dto'
import { NotificationResponseDto } from './dto/notification-response.dto'
import { Observable } from 'rxjs'

export class NotificationsClientService implements INotificationsClientService, OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'notifications',
      protoPath: join(__dirname, '../../../proto/notifications.proto'),
      url: environment.notificationsGrpcUrl,
    },
  })
  private client: ClientGrpc
  private service: INotificationsClientService

  onModuleInit() {
    this.service = this.client.getService<INotificationsClientService>('NotificationService')
  }
  async sendVerificationNotification(
    data: SendAccountNotificationDto
  ): Promise<Observable<NotificationResponseDto>> {
    const resp = await this.service.sendVerificationNotification(data)
    resp.subscribe()
    return resp
  }

  async sendWelcomeNotification(
    data: SendAccountNotificationDto
  ): Promise<Observable<NotificationResponseDto>> {
    const resp = await this.service.sendWelcomeNotification(data);
    resp.subscribe();
    return resp;
  }
}
