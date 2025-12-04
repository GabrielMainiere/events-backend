export class TemplateName {
  private readonly value: string;

  private constructor(value: string) {
    this.validate(value);
    this.value = value.trim();
  }

  static create(value: string): TemplateName {
    return new TemplateName(value);
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('Template name cannot be empty');
    }

    if (value. trim().length < 3) {
      throw new Error('Template name must be at least 3 characters long');
    }

    if (value.trim().length > 50) {
      throw new Error('Template name cannot exceed 50 characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: TemplateName): boolean {
    return this.value === other. value;
  }

  toString(): string {
    return this. value;
  }
}