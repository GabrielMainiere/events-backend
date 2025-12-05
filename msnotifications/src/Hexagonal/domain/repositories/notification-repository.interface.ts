import { Notification } from "../aggregates/notification.aggregate";

export interface INotificationRepository {

  save(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  findAll(): Promise<Notification[]>;
  findPending(): Promise<Notification[]>;
  findFailedForRetry(maxRetries: number): Promise<Notification[]>;
  findByUserId(userId: string): Promise<Notification[]>;

}