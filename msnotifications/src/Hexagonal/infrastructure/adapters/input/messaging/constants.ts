export const RABBITMQ = {
  EXCHANGE: 'notifications_exchange',
  QUEUE: 'notifications_queue',
  DLQ: 'notifications_dead_letter_queue',
  BINDING_PATTERN: 'notification.#', 
  ROUTING_KEY_DISPATCH: 'notification.dispatch',
};