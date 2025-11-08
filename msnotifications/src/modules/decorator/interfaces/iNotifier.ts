
export interface INotifier {
  send(recipient: string, subject: string, body: string): Promise<void>;
}