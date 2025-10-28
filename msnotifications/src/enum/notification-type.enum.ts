import { registerEnumType } from '@nestjs/graphql';
import { NotificationType } from '@prisma/client';

export { NotificationType };

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Tipos de notificação disponíveis no sistema',
});
