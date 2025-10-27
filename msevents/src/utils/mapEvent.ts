import { tb_event, tb_address } from 'generated/prisma';
import { Event } from 'src/events/entities/event.entity';
import { Address } from 'src/events/entities/address.entity';

export function mapEvent(event: tb_event & { address: tb_address }): Event {
  const address: Address = {
    id: event.address.id,
    street: event.address.street,
    number: event.address.number ?? undefined,
    city: event.address.city,
    state: event.address.state,
    zipcode: event.address.zipcode,
    country: event.address.country,
  };

  return {
    id: event.id,
    title: event.title,
    description: event.description ?? undefined,
    startAt: event.start_at,
    endAt: event.end_at,
    price: event.price ?? undefined,
    saleStartAt: event.sale_start_at ?? undefined,
    saleEndAt: event.sale_end_at ?? undefined,
    address,
    capacity: event.capacity,
    isFree: event.isFree,
    status: event.status,
    eventType: event.event_type,
    createdAt: event.created_at,
    updatedAt: event.updated_at,
  };
}
