import { Event } from "../../entities/event.entity";

export interface GetEventByIdPort {
    getById(id: string): Promise<Event>;
}