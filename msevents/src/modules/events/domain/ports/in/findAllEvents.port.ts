import { Event } from "../../entities/event.entity";

export interface FindAllEventsPort {
    getAllEvents(): Promise<Event[]>;
}