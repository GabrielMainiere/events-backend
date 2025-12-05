export class ProcessNotificationCommand {
  constructor(
    public readonly userId: string,
    public readonly notificationType: string,
    public readonly channel: string,
    public readonly recipientAddress: string,
    public readonly templateName: string,
    public readonly payload: Record<string, any>
  ) {}

  static fromRabbitMQMessage(message: any): ProcessNotificationCommand {
    return new ProcessNotificationCommand(
      message.userId,
      message. notificationType,
      message. channel,
      message.recipientAddress,
      message.templateName,
      message.payload
    );
  }

  validate(): void {
    if (!this.userId || this.userId.trim(). length === 0) {
      throw new Error('userId is required');
    }

    if (!this.notificationType || this.notificationType.trim().length === 0) {
      throw new Error('notificationType is required');
    }

    if (!this.channel || this. channel.trim().length === 0) {
      throw new Error('channel is required');
    }

    if (!this.recipientAddress || this.recipientAddress.trim().length === 0) {
      throw new Error('recipientAddress is required');
    }

    if (!this.templateName || this.templateName.trim().length === 0) {
      throw new Error('templateName is required');
    }

    if (!this. payload || typeof this.payload !== 'object') {
      throw new Error('payload must be an object');
    }
  }
}