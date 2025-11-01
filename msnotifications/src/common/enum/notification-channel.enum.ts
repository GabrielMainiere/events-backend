import { registerEnumType } from '@nestjs/graphql';
import { NotificationChannel } from '@prisma/client';

export { NotificationChannel };

registerEnumType(NotificationChannel, {
  name: 'NotificationChannel',
  description: 'Canais de notificação disponíveis',
});