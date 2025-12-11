import { IEventBuilder, EventProps, AddressProps } from './IEventsBuilder';
import { EventType } from '@prisma/client';
import { EventStatus } from '@prisma/client';

export class EventBuilder implements IEventBuilder {
  private event: Partial<EventProps> = {};

  produceBasicInfo(title: string, startAt: Date, endAt : Date, isFree : boolean): void {
    this.event.title = title;
    this.event.startAt = startAt;
    this.event.endAt = endAt;
    this.event.isFree = isFree;
  }

  produceDescription(description?: string): void {
    this.event.description = description;
  }

  producePrice(price?: number): void {
      this.event.price = price;
  }

  produceSaleDates(saleStartAt?: Date, saleEndAt?: Date): void {
    this.event.saleStartAt = saleStartAt;
    this.event.saleEndAt = saleEndAt;
  }

  produceAddress(address: AddressProps): void {
    this.event.address = address;
  }

  produceType(type?: EventType): void {
    this.event.eventType = type ?? EventType.MEETING;
  }

  produceStatus(status?: EventStatus): void {
    this.event.status = status ?? EventStatus.DRAFT;
  }

  produceCapacity(capacity: number): void {
    this.event.capacity = capacity;
  }

  getResult(): EventProps {
    if (!this.event.title || !this.event.startAt || !this.event.endAt || !this.event.address) {
      throw new Error('Event must have a title, start date, end date, and address.');
    }
    return this.event as EventProps;
  }
}
