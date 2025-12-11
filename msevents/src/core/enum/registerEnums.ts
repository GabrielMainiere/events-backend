import { registerEnumType } from '@nestjs/graphql';
import { EventStatus, EventType } from '@prisma/client';

registerEnumType(EventStatus, {
  name: 'EventStatus',
  description: 'Status do evento',
});

registerEnumType(EventType, {
  name: 'EventType',
  description: 'Tipo do evento',
});
