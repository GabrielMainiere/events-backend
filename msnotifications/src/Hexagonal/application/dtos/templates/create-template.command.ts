export class CreateTemplateCommand {
  constructor(
    public readonly templateName: string,
    public readonly notificationType: string,
    public readonly channel: string,
    public readonly subjectTemplate: string,
    public readonly bodyTemplate: string
  ) {}

  static fromGraphQLInput(input: any): CreateTemplateCommand {
    return new CreateTemplateCommand(
      input.templateName,
      input.notificationType,
      input.channel,
      input. subjectTemplate,
      input. bodyTemplate
    );
  }

  validate(): void {
    if (!this.templateName || this.templateName.trim().length === 0) {
      throw new Error('templateName is required');
    }

    if (this.templateName.length < 3) {
      throw new Error('templateName must have at least 3 characters');
    }

    if (!this. notificationType || this.notificationType.trim().length === 0) {
      throw new Error('notificationType is required');
    }

    if (!this.channel || this.channel.trim().length === 0) {
      throw new Error('channel is required');
    }

    if (!this. subjectTemplate || this.subjectTemplate.trim().length === 0) {
      throw new Error('subjectTemplate is required');
    }

    if (!this.bodyTemplate || this.bodyTemplate.trim().length === 0) {
      throw new Error('bodyTemplate is required');
    }
  }
}