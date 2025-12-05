export class UserPreferenceResponse {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly notificationType: string,
    public readonly channel: string,
    public readonly isEnabled: boolean,
    public readonly updatedAt: Date
  ) {}

  toGraphQL(): Record<string, any> {
    return {
      id: this.id,
      userId: this.userId,
      notificationType: this.notificationType,
      channel: this.channel,
      isEnabled: this.isEnabled,
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}