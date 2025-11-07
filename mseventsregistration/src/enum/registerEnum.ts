import { registerEnumType } from '@nestjs/graphql';

export enum GqlEventStatus {
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
  CONFIRMED = 'CONFIRMED',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  CANCELED = 'CANCELED',
}

registerEnumType(GqlEventStatus, { name: 'EventStatus' });

export enum GqlEventType {
  MEETING = 'MEETING',
  CONFERENCE = 'CONFERENCE',
  WORKSHOP = 'WORKSHOP',
  PARTY = 'PARTY',
}

registerEnumType(GqlEventType, { name: 'EventType' });
