import { EventStatus } from "generated/prisma";
import { EventType } from "generated/prisma";

export interface EventProps {
    title: string;
    description?: string;
    startAt: Date;
    endAt: Date;
    price?: number;
    saleStartAt?: Date,
    saleEndAt?: Date,
    addressStreet: string;
    addressNumber?: string;
    addressCity: string;
    addressState: string;
    addressZipcode: string;
    addressCountry: string;
    eventType: EventType;
    status: EventStatus;
}

export interface IEventBuilder {
    produceBasicInfo(title : string, startAt : Date, endAt : Date): void;
    produceDescription(description?: string): void;
    producePrice(price?: number): void;
    produceSaleDates(saleStartAt?: Date, saleEndAt?: Date): void;
    produceAddress(street : string, number : string, city : string, state : string, zipcode : string, country : string): void;
    produceType(type?: EventType): void;
    produceStatus(status?: EventStatus): void;
    getResult(): EventProps;
}
