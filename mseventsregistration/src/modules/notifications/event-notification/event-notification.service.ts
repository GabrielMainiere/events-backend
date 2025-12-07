import { Injectable } from '@nestjs/common'
import { NotificationsTemplateNames } from 'src/enum/notificationTemplateEnum'
import { NotificationProducer } from '../notification.producer'
import { UserDomain } from 'src/modules/users/domain/user.entity'
import { EventDomain } from 'src/modules/events/domain/event.entity'

@Injectable()
export class EventNotificationService {
  constructor(private readonly notificationProducer: NotificationProducer) {}

  async sendEventRegistrationNotification(
    user: UserDomain,
    event: EventDomain
  ) {
    await this.notificationProducer.publish({
      user_id: user.id,
      recipient_address: user.email,
      template_name: NotificationsTemplateNames.EVENT_REGISTRATION_EMAIL,
      payload: {
        name: user.name,
        eventName: event.title,
        eventDate: `${event.startAt.toLocaleString('pt-BR')} - ${event.endAt.toLocaleString('pt-BR')}`,
        eventLocation: `${event.addressCountry}, ${event.addressState} - ${event.addressCity}, Rua ${event.addressStreet} ${event.addressNumber || 'S/N'} - ${event.addressZipcode}`
      }
    })
  }

  async sendWaitingPaymentNotification(user: UserDomain, event: EventDomain) {
    await this.notificationProducer.publish({
      user_id: user.id,
      recipient_address: user.email,
      template_name: NotificationsTemplateNames.EVENT_WAITING_PAYMENT_EMAIL,
      payload: {
        name: user.name,
        eventName: event.title,
        eventDate: `${event.startAt.toLocaleString('pt-BR')} - ${event.endAt.toLocaleString('pt-BR')}`,
        eventLocation: `${event.addressCountry}, ${event.addressState} - ${event.addressCity}, Rua ${event.addressStreet} ${event.addressNumber || 'S/N'} - ${event.addressZipcode}`,
        eventPrice: event.price ? `R$ ${event.price}` : 'Gratuito'
      }
    })
  }

  async sendEventCancellationNotification(
    user: UserDomain,
    event: EventDomain
  ) {
    await this.notificationProducer.publish({
      user_id: user.id,
      recipient_address: user.email,
      template_name: NotificationsTemplateNames.EVENT_CANCELLATION_EMAIL,
      payload: {
        name: user.name,
        eventName: event.title,
        eventDate: `${event.startAt.toLocaleString('pt-BR')} - ${event.endAt.toLocaleString('pt-BR')}`,
        eventLocation: `${event.addressCountry}, ${event.addressState} - ${event.addressCity}, Rua ${event.addressStreet} ${event.addressNumber || 'S/N'} - ${event.addressZipcode}`
      }
    })
  }

  async sendEventCheckInNotification(user: UserDomain, event: EventDomain) {
    await this.notificationProducer.publish({
      user_id: user.id,
      recipient_address: user.email,
      template_name: NotificationsTemplateNames.EVENT_CHECKIN_EMAIL,
      payload: {
        name: user.name,
        eventName: event.title,
        eventDate: `${event.startAt.toLocaleString('pt-BR')} - ${event.endAt.toLocaleString('pt-BR')}`,
        eventLocation: `${event.addressCountry}, ${event.addressState} - ${event.addressCity}, Rua ${event.addressStreet} ${event.addressNumber || 'S/N'} - ${event.addressZipcode}`
      }
    })
  }
}
