import { tb_event } from "generated/prisma";
import { Event } from "src/events/entities/event.entity";

export function mapEvent(event: tb_event): Event {
  return {
    id: event.id,
    title: event.title,
    description: event.description ?? undefined,
    startAt: event.start_at,
    endAt: event.end_at ?? undefined,
    location: event.location ?? undefined,
    status: event.status,
    eventType: event.event_type,
    createdAt: event.created_at,
    updatedAt: event.updated_at,
  };
}
