export class DeleteUserPreferencesCommand {
  constructor(
    public readonly userId: string
  ) {}

  static fromGraphQLArgs(args: any): DeleteUserPreferencesCommand {
    return new DeleteUserPreferencesCommand(args.userId);
  }

  validate(): void {
    if (!this.userId || this.userId.trim(). length === 0) {
      throw new Error('userId is required');
    }
  }

  getDescription(): string {
    return `Delete all preferences for user: ${this.userId}`;
  }

  toJSON(): Record<string, any> {
    return {
      userId: this. userId,
      operation: 'delete_all_preferences',
      timestamp: new Date().toISOString(),
    };
  }
}