import { Injectable } from '@nestjs/common';

@Injectable()
export class PayloadHelper {

  enrichWithEventId(payloadJson: string, eventId: string): string {
    const payload = this.parsePayload(payloadJson);
    return JSON.stringify({ ...payload, eventId });
  }

  enrichWithPaymentId(payloadJson: string, paymentId: string): string {
    const payload = this.parsePayload(payloadJson);
    return JSON.stringify({ ...payload, paymentId });
  }

  enrichWithCustomField(payloadJson: string, fieldName: string, fieldValue: any): string {
    const payload = this.parsePayload(payloadJson);
    return JSON.stringify({ ...payload, [fieldName]: fieldValue });
  }

  private parsePayload(payloadJson: string): Record<string, any> {
    try {
      return JSON.parse(payloadJson);
    } catch (error) {
      throw new Error(`Falha ao parsear payload JSON: ${error.message}`);
    }
  }
}