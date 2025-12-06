export interface IEmailGateway {
  send(to: string, subject: string, body: string): Promise<void>;
}