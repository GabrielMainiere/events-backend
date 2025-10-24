import { EventType } from "generated/prisma";
import { EventProps } from "../builder/IEventsBuilder";

export interface IEventsFactory {
  create(type: EventType, data: Partial<EventProps>): EventProps;
}
