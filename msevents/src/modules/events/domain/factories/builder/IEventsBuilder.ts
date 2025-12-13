import { DomainEventStatus, DomainEventType } from "../../entities/event.entity";

export interface AddressProps {
  street: string;
  number?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

export interface EventProps {
    title: string;
    description?: string;
    startAt: Date;
    endAt: Date;
    price?: number;
    saleStartAt?: Date;
    saleEndAt?: Date;
    address: AddressProps;
    capacity: number;
    isFree: boolean;
    eventType: DomainEventType;
    status: DomainEventStatus;
}

export interface IEventBuilder {
    produceBasicInfo(title : string, startAt : Date, endAt : Date, isFree : boolean): void;
    produceDescription(description?: string): void;
    producePrice(price?: number): void;
    produceSaleDates(saleStartAt?: Date, saleEndAt?: Date): void;
    produceAddress(address: AddressProps): void;
    produceType(type?: DomainEventType): void;
    produceStatus(status?: DomainEventStatus): void;
    produceCapacity(capacity: number): void;
    getResult(): EventProps;
}
