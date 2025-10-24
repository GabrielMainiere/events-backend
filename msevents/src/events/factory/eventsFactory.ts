import { EventType } from "generated/prisma";
import { EventBuilder } from "../builder/eventsBuilder";
import { EventProps } from "../builder/IEventsBuilder";
import { DefaultEvent } from "./defaultEvent";
import { MeetingEvent } from "./meetingEvent";

export class EventFactory {
  create(type: EventType, data: Partial<EventProps>): EventProps {
    let builder: EventBuilder;

    switch(type) {
      case EventType.CONFERENCE:
        builder = new MeetingEvent();
        break;
      default:
        builder = new DefaultEvent();
    }

    if (data.title) builder.withTitle(data.title);
    if (data.description) builder.withDescription(data.description);
    if (data.startAt) builder.withStartAt(data.startAt);
    if (data.endAt) builder.withEndAt(data.endAt);
    if (data.location) builder.withLocation(data.location);
    if (data.status) builder.withStatus(data.status);

    return builder.build();
  }
}
