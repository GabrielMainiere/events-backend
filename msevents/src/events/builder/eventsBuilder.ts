import { IEventBuilder, EventProps } from './IEventsBuilder';
import { EventType } from 'generated/prisma';
import { EventStatus } from 'generated/prisma';

export class EventBuilder implements IEventBuilder {
    private event: Partial<EventProps> = {};

    withTitle(title: string): this {
        this.event.title = title;
        return this;
    }

    withDescription(description?: string): this {
        this.event.description = description;
        return this;
    }

    withStartAt(startAt: Date): this {
        this.event.startAt = startAt;
        return this;
    }

    withEndAt(endAt: Date): this {
        this.event.endAt = endAt;
        return this;
    }

    withLocation(location: string): this {
        this.event.location = location;
        return this;
    }

    withType(type: EventType): this {
        this.event.eventType = type;
        return this;
    }

    withStatus(status: EventStatus): this {
        this.event.status = status;
        return this;
    }

    build(): EventProps {
        if (!this.event.title) {
        throw new Error("Event must have a title");
        }
        if (!this.event.startAt) {
        throw new Error("Event must have a start date");
        }
        if (!this.event.status) {
        this.event.status = EventStatus.DRAFT;
        }
        if (!this.event.eventType) {
        this.event.eventType = EventType.MEETING;
        }
        return this.event as EventProps;
    }
}
