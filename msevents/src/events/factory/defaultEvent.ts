import { EventBuilder } from "../builder/eventsBuilder";
import { EventStatus, EventType } from "generated/prisma";

export class DefaultEvent extends EventBuilder {
  constructor() {
    super();
    this.withStatus(EventStatus.DRAFT);
  }
}
