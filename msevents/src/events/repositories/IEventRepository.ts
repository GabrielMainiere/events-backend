import { EventProps } from "../builder/IEventsBuilder";
import { EventWithAddress } from "./events.repository";

export interface IEventRepository {
    create(eventData: EventProps): Promise<EventWithAddress>;
    update(id: string, eventData: Partial<EventProps>): Promise<EventWithAddress>
    getById(id: string): Promise<EventWithAddress | null>;
    findAll(): Promise<EventWithAddress[]>;
    cancel(id: string): Promise<EventWithAddress>;
}