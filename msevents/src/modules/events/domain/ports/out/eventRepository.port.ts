import { Event } from "../../entities/event.entity";
import { EventProps } from "../../factories/builder/IEventsBuilder";

export interface EventRepositoryPort {
    create(event: EventProps): Promise<Event>;
    update(id: string, event: Partial<EventProps>): Promise<Event>;
    getById(id: string): Promise<Event | null>;
    findAll(): Promise<Event[]>;
    cancel(id: string): Promise<Event>;
}