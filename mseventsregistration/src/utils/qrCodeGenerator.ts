import * as QRCode from 'qrcode';

export class QRCodeGenerator {
  static async generateBase64(data: string): Promise<string> {
    try {
      return await QRCode.toDataURL(data, {
        width: 300,
        margin: 2,
      });
    } catch (error) {
      throw new Error('Error to generate QRcode: ' + (error as Error).message);
    }
  }
}
