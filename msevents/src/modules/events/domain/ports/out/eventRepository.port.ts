import { EventProps } from "../../factories/builder/IEventsBuilder";
import { EventWithAddress } from "../../../infrastructure/adapters/out/database/events.repository.adapter";

export interface EventRepositoryPort {
    create(eventData: EventProps): Promise<EventWithAddress>;
    update(id: string, eventData: Partial<EventProps>): Promise<EventWithAddress>
    getById(id: string): Promise<EventWithAddress | null>;
    findAll(): Promise<EventWithAddress[]>;
    cancel(id: string): Promise<EventWithAddress>;
}