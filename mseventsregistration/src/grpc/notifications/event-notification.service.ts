import { Injectable } from '@nestjs/common';
import { NotificationsClientService } from 'src/grpc/notifications/client/notifications.client.service';
import { NotificationsTemplateNames } from 'src/enum/notificationTemplateEnum';
import { tb_user, tb_registered_event } from '@prisma/client';

@Injectable()
export class EventNotificationService {
  constructor(
    private readonly notificationsClientService: NotificationsClientService,
  ) {}

  async sendEventRegistrationNotification(user: tb_user, event: tb_registered_event) {
      await this.notificationsClientService.sendEventNotification({
        userId: user.id,
        recipientAddress: user.email,
        eventId: event.id,
        payloadJson: JSON.stringify({
          name: user.name,
          eventName: event.title,
          eventDate: `${event.start_at.toLocaleString('pt-BR')} - ${event.end_at.toLocaleString('pt-BR')}`,
          eventLocation: `${event.address_country}, ${event.address_state} - ${event.address_city}, Rua ${event.address_street} ${event.address_number || 'S/N'} - ${event.address_zipcode}`,
        }),
        templateName: NotificationsTemplateNames.EVENT_REGISTRATION_EMAIL,
      });
    }

  async sendWaitingPaymentNotification(user: tb_user, event: tb_registered_event) {
      await this.notificationsClientService.sendEventNotification({
        userId: user.id,
        recipientAddress: user.email,
        eventId: event.id,
        payloadJson: JSON.stringify({
          name: user.name,
          eventName: event.title,
          eventDate: `${event.start_at.toLocaleString('pt-BR')} - ${event.end_at.toLocaleString('pt-BR')}`,
          eventLocation: `${event.address_country}, ${event.address_state} - ${event.address_city}, Rua ${event.address_street} ${event.address_number || 'S/N'} - ${event.address_zipcode}`,
          eventPrice: event.price ? `R$ ${(event.price)}` : 'Gratuito',
        }),
        templateName: NotificationsTemplateNames.EVENT_WAITING_PAYMENT_EMAIL,
      });
    }

  async sendEventCancellationNotification(user: tb_user, event: tb_registered_event) {
      await this.notificationsClientService.sendEventNotification({
        userId: user.id,
        recipientAddress: user.email,
        eventId: event.id,
        payloadJson: JSON.stringify({
          name: user.name,
          eventName: event.title,
          eventDate: `${event.start_at.toLocaleString('pt-BR')} - ${event.end_at.toLocaleString('pt-BR')}`,
          eventLocation: `${event.address_country}, ${event.address_state} - ${event.address_city}, Rua ${event.address_street} ${event.address_number || 'S/N'} - ${event.address_zipcode}`,
        }),
        templateName: NotificationsTemplateNames.EVENT_CANCELLATION_EMAIL,
      });
    }
}