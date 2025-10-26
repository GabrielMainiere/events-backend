import { IEventBuilder, EventProps } from './IEventsBuilder';
import { EventType } from 'generated/prisma';
import { EventStatus } from 'generated/prisma';

export class EventBuilder implements IEventBuilder {
  private event: Partial<EventProps> = {};

  produceBasicInfo(title: string, startAt: Date, endAt : Date): void {
    this.event.title = title;
    this.event.startAt = startAt;
    this.event.endAt = endAt;
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

  produceAddress(street : string, city : string, state : string, zipcode : string, country : string, number ?: string): void {
    this.event.addressStreet = street;
    this.event.addressCity = city;
    this.event.addressState = state;
    this.event.addressZipcode = zipcode;
    this.event.addressCountry = country;
    this.event.addressNumber = number;
  }

  produceType(type?: EventType): void {
    this.event.eventType = type ?? EventType.MEETING;
  }

  produceStatus(status?: EventStatus): void {
    this.event.status = status ?? EventStatus.DRAFT;
  }

  getResult(): EventProps {
    if (!this.event.title || !this.event.startAt || !this.event.endAt) {
      throw new Error('Event must have a title, start date and end date.');
    }

    return this.event as EventProps;
  }
}
