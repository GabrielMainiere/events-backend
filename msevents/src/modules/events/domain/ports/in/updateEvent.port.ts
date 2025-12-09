import { UpdateEventInput } from "src/modules/events/application/dto/update-event-input";
import { Event } from "../../entities/event.entity";

export interface UpdareEventPort {
    updateEvent(input: UpdateEventInput): Promise<Event>;
}