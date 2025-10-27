import { tb_event } from "generated/prisma";
import { Event } from "src/events/entities/event.entity";

export function mapEvent(event: tb_event): Event {
  return {
    id: event.id,
    title: event.title,
    description: event.description ?? undefined,
    startAt: event.start_at,
    endAt: event.end_at,
    price: event.price ?? undefined,
    saleStartAt: event.sale_start_at ?? undefined,
    saleEndAt: event.sale_end_at ?? undefined,
    addressStreet: event.address_street,
    addressNumber: event.address_number ?? undefined,
    addressCity: event.address_city,
    addressState: event.address_state,
    addressZipcode: event.address_zipcode,
    addressCountry: event.address_country,
    capacity: event.capacity,
    isFree: event.isFree,
    status: event.status,
    eventType: event.event_type,
    createdAt: event.created_at,
    updatedAt: event.updated_at,
  };
}
