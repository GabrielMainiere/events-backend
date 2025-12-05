export class UpdateTemplateCommand {
  constructor(
    public readonly templateId: string,
    public readonly templateName?: string,
    public readonly subjectTemplate?: string,
    public readonly bodyTemplate?: string
  ) {}

  static fromGraphQLInput(id: string, input: any): UpdateTemplateCommand {
    return new UpdateTemplateCommand(
      id,
      input.templateName,
      input.subjectTemplate,
      input.bodyTemplate
    );
  }

  validate(): void {
    if (!this.templateId || this.templateId.trim().length === 0) {
      throw new Error('templateId is required');
    }

    if (! this.templateName && !this. subjectTemplate && !this.bodyTemplate) {
      throw new Error('At least one field must be provided for update');
    }

    if (this.templateName !== undefined) {
      if (this.templateName.trim().length === 0) {
        throw new Error('templateName cannot be empty');
      }
      if (this.templateName.length < 3) {
        throw new Error('templateName must have at least 3 characters');
      }
    }

    if (this.subjectTemplate !== undefined && this.subjectTemplate.trim(). length === 0) {
      throw new Error('subjectTemplate cannot be empty');
    }

    if (this. bodyTemplate !== undefined && this.bodyTemplate.trim().length === 0) {
      throw new Error('bodyTemplate cannot be empty');
    }
  }

  hasFieldToUpdate(field: 'templateName' | 'subjectTemplate' | 'bodyTemplate'): boolean {
    return this[field] !== undefined;
  }
}