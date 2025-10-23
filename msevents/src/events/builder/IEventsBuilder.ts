import { EventStatus } from "generated/prisma";
import { EventType } from "generated/prisma";

export interface EventProps {
    title: string;
    description?: string;
    startAt: Date;
    endAt?: Date;
    location?: string;
    eventType: EventType;
    status: EventStatus;
}

export interface IEventBuilder {
    withTitle(title: string): this;
    withDescription(description?: string): this;
    withStartAt(startAt: Date): this;
    withEndAt(endAt: Date): this;
    withLocation(location: string): this;
    withType(type: EventType): this;
    withStatus(status: EventStatus): this;
    build(): EventProps;
}
