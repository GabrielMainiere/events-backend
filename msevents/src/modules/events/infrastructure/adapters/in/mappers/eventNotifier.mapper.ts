import { Event } from 'src/modules/events/domain/entities/event.entity';
import { IEventNotificationRequest } from '../../out/messaging/dto/IEventRegistrationRequest';

export class EventsNotifierMapper {
  static toNotification(event: Event): IEventNotificationRequest {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      startAt: event.startAt.toISOString(),
      endAt: event.endAt.toISOString(),
      saleStartAt: event.saleStartAt ? event.saleStartAt.toISOString() : undefined,
      saleEndAt: event.saleEndAt ? event.saleEndAt.toISOString() : undefined,
      price: event.price,
      capacity: event.capacity,
      isFree: event.isFree,
      addressStreet: event.address.street,
      addressNumber: event.address.number,
      addressCity: event.address.city,
      addressState: event.address.state,
      addressZipcode: event.address.zipcode,
      addressCountry: event.address.country,
      eventType: event.eventType,
      status: event.status,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    };
  }
}
