import { registerEnumType } from '@nestjs/graphql';
import { NotificationChannel } from '@prisma/client';

registerEnumType(NotificationChannel, {
  name: 'NotificationChannel',
  description: 'Canais de notificação disponíveis',
});