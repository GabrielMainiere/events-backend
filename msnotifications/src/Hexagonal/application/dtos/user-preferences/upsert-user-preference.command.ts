export class UpsertUserPreferenceCommand {
  constructor(
    public readonly userId: string,
    public readonly notificationType: string,
    public readonly channel: string,
    public readonly isEnabled: boolean
  ) {}

  static fromGraphQLInput(input: any): UpsertUserPreferenceCommand {
    return new UpsertUserPreferenceCommand(
      input.userId,
      input.notificationType,
      input.channel,
      input.isEnabled
    );
  }

  validate(): void {
    if (!this. userId || this.userId.trim(). length === 0) {
      throw new Error('userId is required');
    }

    if (!this.notificationType || this.notificationType.trim().length === 0) {
      throw new Error('notificationType is required');
    }

    if (!this. channel || this.channel.trim(). length === 0) {
      throw new Error('channel is required');
    }

    if (typeof this.isEnabled !== 'boolean') {
      throw new Error('isEnabled must be a boolean');
    }
  }
}