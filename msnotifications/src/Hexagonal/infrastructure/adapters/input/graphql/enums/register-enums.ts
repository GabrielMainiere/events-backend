import { registerEnumType } from '@nestjs/graphql';
import { NotificationType } from '../../../../../domain/enums/notification-type.enum';
import { NotificationChannel } from '../../../../../domain/enums/notification-channel.enum';
import { NotificationStatus } from '../../../../../domain/enums/notification-status.enum';

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Tipos de notificações disponíveis no sistema',
});

registerEnumType(NotificationChannel, {
  name: 'NotificationChannel',
  description: 'Canais pelos quais as notificações podem ser enviadas',
});

registerEnumType(NotificationStatus, {
  name: 'NotificationStatus',
  description: 'Status de uma notificação',
});
