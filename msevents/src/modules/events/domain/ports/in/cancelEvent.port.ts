import { Event } from "../../entities/event.entity";

export interface CancelEventPort {
    cancelEvent(id: string): Promise<Event>;
}