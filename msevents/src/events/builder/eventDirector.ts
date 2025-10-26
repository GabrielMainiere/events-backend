import { IEventBuilder } from "./IEventsBuilder";
import { EventProps } from './IEventsBuilder';

export class EventDirector {
  private builder!: IEventBuilder;

  setBuilder(builder: IEventBuilder): void {
    this.builder = builder;
  }

  buildMinimalEvent(title: string, startAt: Date, endAt: Date): EventProps {
    this.builder.produceBasicInfo(title, startAt, endAt);
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
    description?: string,
    price?: number,
    saleStartAt?: Date,
    saleEndAt?: Date
    
  ): EventProps {
    this.builder.produceBasicInfo(title, startAt, endAt);
    this.builder.produceDescription(description);
    this.builder.producePrice(price);
    this.builder.produceSaleDates(saleStartAt, saleEndAt);
    this.builder.produceAddress(addressStreet, addressCity, addressState, addressZipcode, addressCountry, addressNumber);
    this.builder.produceType();
    this.builder.produceStatus();
    return this.builder.getResult();
  }
}
