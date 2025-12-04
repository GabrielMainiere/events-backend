export class Payload {
  private readonly data: Record<string, any>;

  private constructor(data: Record<string, any>) {
    this.validate(data);
    this.data = { ...data };
  }

  static create(data: Record<string, any>): Payload {
    return new Payload(data);
  }

  static fromJson(json: string): Payload {
    try {
      const parsed = JSON.parse(json);
      return new Payload(parsed);
    } catch (error) {
      throw new Error(`Invalid JSON payload: ${error.message}`);
    }
  }

  private validate(data: Record<string, any>): void {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Payload must be a valid object');
    }
  }

  enrichWithEventId(eventId: string): Payload {
    return new Payload({ ...this.data, eventId });
  }

  enrichWithPaymentId(paymentId: string): Payload {
    return new Payload({ ...this.data, paymentId });
  }

  enrichWithField(fieldName: string, fieldValue: any): Payload {
    return new Payload({ ...this.data, [fieldName]: fieldValue });
  }

  getData(): Record<string, any> {
    return { ...this.data };
  }

  toJson(): string {
    return JSON.stringify(this.data);
  }

  has(key: string): boolean {
    return key in this.data;
  }

  get(key: string): any {
    return this.data[key];
  }
}