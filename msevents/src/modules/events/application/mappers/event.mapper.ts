import { tb_event, tb_address } from "generated/prisma";
import { Event } from "../../domain/entities/event.entity";
import { Address } from "../../domain/value-objects/address.entity";
import { 
  DomainEventStatus, 
  DomainEventType 
} from "../../domain/entities/event.entity";

export function mapEvent(event: tb_event & { address: tb_address }): Event {
  const address = new Address(
    event.address.street,
    event.address.number ?? undefined,
    event.address.city,
    event.address.state,
    event.address.zipcode,
    event.address.country
  );

  return new Event(
    event.id,
    event.title,
    event.description ?? undefined,
    event.start_at,
    event.end_at,
    event.sale_start_at ?? undefined,
    event.sale_end_at ?? undefined,
    event.price ?? undefined,
    event.isFree,
    event.capacity,
    address,
    event.status as DomainEventStatus,
    event.event_type as DomainEventType,
    event.created_at,
    event.updated_at,
  );
}
