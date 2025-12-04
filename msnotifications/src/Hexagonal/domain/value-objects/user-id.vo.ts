import { randomUUID } from 'crypto';

export class UserId {
  private readonly value: string;

  private constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  static create(value: string): UserId {
    return new UserId(value);
  }

  static generate(): UserId {
    return new UserId(randomUUID());
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('User ID cannot be empty');
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (! uuidRegex.test(value)) {
      throw new Error(`Invalid UUID v4 format: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}