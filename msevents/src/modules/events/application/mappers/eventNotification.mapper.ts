import { EventWithAddress } from "../../infrastructure/adapters/out/database/events.repository.adapter";
import { IEventNotificationRequest } from "../../infrastructure/adapters/out/messaging/dto/IEventRegistrationRequest";

export class EventsNotificationMapper {
    
    static toNotification(event: EventWithAddress): IEventNotificationRequest {
        return {
            id: event.id,
            title: event.title,
            description: event.description ?? '',
            startAt: event.start_at.toISOString(),
            endAt: event.end_at.toISOString(),
            price: event.price ?? 0,
            saleStartAt: event.sale_start_at?.toISOString() ?? '',
            saleEndAt: event.sale_end_at?.toISOString() ?? '',
            addressStreet: event.address.street,
            addressNumber: event.address.number ?? '',
            addressCity: event.address.city,
            addressState: event.address.state,
            addressZipcode: event.address.zipcode,
            addressCountry: event.address.country,
            capacity: event.capacity,
            isFree: event.isFree,
            eventType: event.event_type,
            status: event.status,
            createdAt: event.created_at.toISOString(),
            updatedAt: event.updated_at.toISOString(),
        };
    }
}
