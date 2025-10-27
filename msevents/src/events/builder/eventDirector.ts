import { IEventBuilder } from "./IEventsBuilder";
import { EventProps } from './IEventsBuilder';

export class EventDirector {
  private builder!: IEventBuilder;

  setBuilder(builder: IEventBuilder): void {
    this.builder = builder;
  }

  buildMinimalEvent(title: string, startAt: Date, endAt: Date, isFree : boolean): EventProps {
    this.builder.produceBasicInfo(title, startAt, endAt, isFree);
    this.builder.produceStatus();
    this.builder.produceType();
    return this.builder.getResult();
  }

  buildFullEvent(
    title: string,
    startAt: Date,
    endAt: Date,
    addressStreet: string,
    addressNumber: string,
    addressCity: string,
    addressState: string,
    addressZipcode: string,
    addressCountry: string,
    capacity: number,
    isFree: boolean,
    description?: string,
    price?: number,
    saleStartAt?: Date,
    saleEndAt?: Date
    
  ): EventProps {
    this.builder.produceBasicInfo(title, startAt, endAt, isFree);
    this.builder.produceDescription(description);
    this.builder.producePrice(price);
    this.builder.produceSaleDates(saleStartAt, saleEndAt);
    this.builder.produceAddress(addressStreet, addressCity, addressState, addressZipcode, addressCountry, addressNumber);
    this.builder.produceType();
    this.builder.produceStatus();
    this.builder.produceCapacity(capacity);
    return this.builder.getResult();
  }
}
