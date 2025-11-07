
export interface INotificationStrategy {
  send(recipient: string, subject: string, body: string): Promise<void>;
}