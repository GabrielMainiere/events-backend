import { Address } from "../value-objects/address.entity";

export enum DomainEventStatus {
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
  CONFIRMED = "CONFIRMED",
  WAITING_PAYMENT = "WAITING_PAYMENT",
  CANCELED = "CANCELED"
}

export enum DomainEventType {
  MEETING = "MEETING",
  CONFERENCE = "CONFERENCE",
  WORKSHOP = "WORKSHOP",
  PARTY = "PARTY"
}

export class Event {
  constructor(
    readonly id: string,
    public title: string,
    public description: string | undefined,
    public startAt: Date,
    public endAt: Date,
    public saleStartAt: Date | undefined,
    public saleEndAt: Date | undefined,
    public price: number | undefined,
    public isFree: boolean,
    public capacity: number,
    public address: Address,
    public status: DomainEventStatus,
    public eventType: DomainEventType,
    readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  cancel() {
    if (this.status === DomainEventStatus.CANCELED)
      throw new Error("Event already cancelled");

    if (!this.isFree)
      throw new Error("Only free events can be canceled");

    this.status = DomainEventStatus.CANCELED;
    this.updatedAt = new Date();
  }
}
