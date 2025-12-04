export interface DomainEvent {

  readonly occurredAt: Date;

  readonly aggregateName: string;

  readonly aggregateId: string;

  readonly eventName: string;
}