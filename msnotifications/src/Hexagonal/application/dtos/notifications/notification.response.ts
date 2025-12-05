export class NotificationResponse {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly notificationType: string,
    public readonly channel: string,
    public readonly recipientAddress: string,
    public readonly templateName: string,
    public readonly status: string,
    public readonly sentAt: Date | undefined,
    public readonly errorMessage: string | undefined,
    public readonly retryCount: number,
    public readonly createdAt: Date
  ) {}

  toJSON(): Record<string, any> {
    return {
      id: this. id,
      userId: this. userId,
      notificationType: this.notificationType,
      channel: this.channel,
      recipientAddress: this.recipientAddress,
      templateName: this.templateName,
      status: this.status,
      sentAt: this.sentAt?. toISOString(),
      errorMessage: this.errorMessage,
      retryCount: this.retryCount,
      createdAt: this.createdAt.toISOString(),
    };
  }
}