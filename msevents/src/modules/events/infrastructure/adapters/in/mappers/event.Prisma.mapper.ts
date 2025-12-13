import { Event } from 'src/modules/events/domain/entities/event.entity';
import {DomainEventStatus,DomainEventType,
} from 'src/modules/events/domain/entities/event.entity';
import { EventStatus, EventType } from '@prisma/client';


type PrismaEventWithAddress = {
  id: string;
  title: string;
  description: string | null;
  start_at: Date;
  end_at: Date;
  sale_start_at: Date | null;
  sale_end_at: Date | null;
  price: number | null;
  isFree: boolean;
  capacity: number;
  status: EventStatus; 
  event_type: EventType;    
  created_at: Date;
  updated_at: Date;
  address: {
    street: string;
    number: string | null;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
};

function mapStatusToDomain(status: EventStatus): DomainEventStatus {
  switch (status) {
    case EventStatus.DRAFT:
      return DomainEventStatus.DRAFT;

    case EventStatus.ARCHIVED:
      return DomainEventStatus.ARCHIVED;

    case EventStatus.CONFIRMED:
      return DomainEventStatus.CONFIRMED;

    case EventStatus.WAITING_PAYMENT:
      return DomainEventStatus.WAITING_PAYMENT;

    case EventStatus.CANCELED:
      return DomainEventStatus.CANCELED;

    default:
      throw new Error(`Unhandled EventStatus: ${status}`);
  }
}

function mapTypeToDomain(type: EventType): DomainEventType {
  switch (type) {
    case EventType.MEETING:
      return DomainEventType.MEETING;

    case EventType.CONFERENCE:
      return DomainEventType.CONFERENCE;

    case EventType.WORKSHOP:
      return DomainEventType.WORKSHOP;

    case EventType.PARTY:
      return DomainEventType.PARTY;

    default:
      throw new Error(`Unhandled EventType: ${type}`);
  }
}

export class PrismaEventMapper {
  static toDomain(record: PrismaEventWithAddress): Event {
    return new Event(
      record.id,
      record.title,
      record.description ?? undefined,
      record.start_at,
      record.end_at,
      record.sale_start_at ?? undefined,
      record.sale_end_at ?? undefined,
      record.price ?? undefined,
      record.isFree,
      record.capacity,
      {
        street: record.address.street,
        number: record.address.number ?? undefined,
        city: record.address.city,
        state: record.address.state,
        zipcode: record.address.zipcode,
        country: record.address.country,
      },
      mapStatusToDomain(record.status),
      mapTypeToDomain(record.event_type), 
      record.created_at,
      record.updated_at
    );
  }
}
