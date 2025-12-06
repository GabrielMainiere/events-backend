export interface ISmsGateway {
  send(to: string, message: string): Promise<void>;
}