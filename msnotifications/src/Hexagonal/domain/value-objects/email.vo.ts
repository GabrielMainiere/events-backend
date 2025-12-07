export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.validate(value);
    this.value = value. toLowerCase().trim();
  }

  static create(value: string): Email {
    return new Email(value);
  }

  private validate(value: string): void {
    if (!value || value. trim(). length === 0) {
      throw new Error('Email cannot be empty');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error(`Invalid email format: ${value}`);
    }

    if (value.length > 255) {
      throw new Error('Email cannot exceed 255 characters');
    }
  }

  getValue(): string {
    return this. value;
  }

  equals(other: Email): boolean {
    return this.value === other. value;
  }

  toString(): string {
    return this.value;
  }
}