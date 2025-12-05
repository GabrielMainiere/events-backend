export class TemplateResponse {
  constructor(
    public readonly id: string,
    public readonly templateName: string,
    public readonly notificationType: string,
    public readonly channel: string,
    public readonly subjectTemplate: string,
    public readonly bodyTemplate: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  toGraphQL(): Record<string, any> {
    return {
      id: this.id,
      templateName: this.templateName,
      notificationType: this. notificationType,
      channel: this.channel,
      subjectTemplate: this.subjectTemplate,
      bodyTemplate: this.bodyTemplate,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}