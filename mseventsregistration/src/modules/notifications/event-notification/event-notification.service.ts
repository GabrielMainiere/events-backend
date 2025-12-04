import { Injectable } from '@nestjs/common';
import { NotificationsTemplateNames } from 'src/enum/notificationTemplateEnum';
import { tb_user, tb_registered_event } from '@prisma/client';
import { NotificationProducer } from '../notification.producer';

@Injectable()
export class EventNotificationService {
  constructor(
    private readonly notificationProducer: NotificationProducer,
  ) {}

  async sendEventRegistrationNotification(user: tb_user, event: tb_registered_event) {
    await this.notificationProducer.publish({
      user_id: user.id,
      recipient_address: user.email,
      template_name: NotificationsTemplateNames.EVENT_REGISTRATION_EMAIL,
      payload: {
        name: user.name,
        eventName: event.title,
        eventDate: `${event.start_at.toLocaleString('pt-BR')} - ${event.end_at.toLocaleString('pt-BR')}`,
        eventLocation: `${event.address_country}, ${event.address_state} - ${event.address_city}, Rua ${event.address_street} ${event.address_number || 'S/N'} - ${event.address_zipcode}`,
      },
    });
  }

  async sendWaitingPaymentNotification(user: tb_user, event: tb_registered_event) {
    await this.notificationProducer.publish({
      user_id: user.id,
      recipient_address: user.email,
      template_name: NotificationsTemplateNames.EVENT_WAITING_PAYMENT_EMAIL,
      payload: {
        name: user.name,
        eventName: event.title,
        eventDate: `${event.start_at.toLocaleString('pt-BR')} - ${event.end_at.toLocaleString('pt-BR')}`,
        eventLocation: `${event.address_country}, ${event.address_state} - ${event.address_city}, Rua ${event.address_street} ${event.address_number || 'S/N'} - ${event.address_zipcode}`,
        eventPrice: event.price ? `R$ ${(event.price)}` : 'Gratuito',
      },
    });
  }

  async sendEventCancellationNotification(user: tb_user, event: tb_registered_event) {
    await this.notificationProducer.publish({
      user_id: user.id,
      recipient_address: user.email,
      template_name: NotificationsTemplateNames.EVENT_CANCELLATION_EMAIL,
      payload: {
        name: user.name,
        eventName: event.title,
        eventDate: `${event.start_at.toLocaleString('pt-BR')} - ${event.end_at.toLocaleString('pt-BR')}`,
        eventLocation: `${event.address_country}, ${event.address_state} - ${event.address_city}, Rua ${event.address_street} ${event.address_number || 'S/N'} - ${event.address_zipcode}`,
      },
    });
  }

  async sendEventCheckInNotification(user: tb_user, event: tb_registered_event) {
    await this.notificationProducer.publish({
      user_id: user.id,
      recipient_address: user.email,
      template_name: NotificationsTemplateNames.EVENT_CHECKIN_EMAIL,
      payload: {
        name: user.name,
        eventName: event.title,
        eventDate: `${event.start_at.toLocaleString('pt-BR')} - ${event.end_at.toLocaleString('pt-BR')}`,
        eventLocation: `${event.address_country}, ${event.address_state} - ${event.address_city}, Rua ${event.address_street} ${event.address_number || 'S/N'} - ${event.address_zipcode}`,
      },
    });
  }
}