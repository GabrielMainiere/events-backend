import { CreateEventInput } from "src/modules/events/application/dto/create-event.input";
import { Event } from "../../entities/event.entity";

export interface CreateEventPort {
    createEvent(input: CreateEventInput): Promise<Event>;
}