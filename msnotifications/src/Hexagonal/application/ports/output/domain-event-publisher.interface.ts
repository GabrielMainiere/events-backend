import { DomainEvent } from "src/Hexagonal/domain/events/interface/domain-event.interface";

export interface IEventPublisher {
  publish(event: DomainEvent): Promise<void>;
  publishAll(events: DomainEvent[]): Promise<void>;
}