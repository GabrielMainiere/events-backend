import { EventBuilder } from "../builder/eventsBuilder";
import { EventStatus, EventType } from "generated/prisma";

export class MeetingEvent extends EventBuilder {
  constructor() {
    super();
    this.withStatus(EventStatus.PUBLISHED)
        .withType(EventType.MEETING);
  }
}
